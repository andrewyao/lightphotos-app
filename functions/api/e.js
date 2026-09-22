// Event intake for the site's own analytics. Runs as a Cloudflare Pages
// Function on our own origin, so there is no third-party request to make and
// nothing for an ad blocker to recognise and strip.
//
// The contract is deliberately narrow: POST a JSON object naming an event that
// appears in ALLOWED_EVENTS, and it lands as a row in D1 (see
// migrations/0001_init.sql). Anything else is dropped. The response is always
// 204 with no body, whether the event was stored or discarded -- an endpoint
// that reports why it rejected something is an endpoint someone can probe.

// Adding an event anywhere -- a page, app.html, or the Rust side of the web
// build -- means adding its name here too, or it is silently dropped.
const ALLOWED_EVENTS = new Set([
  // Site
  "page_view",
  "download",
  // Web app shell (public/app.html)
  "app_page_view",
  "wasm_loaded",
  "wasm_load_failed",
  // Web app internals (emitted from Rust, wasm32 build only)
  "app_started",
  "folder_opened",
  "first_photo_rendered",
  "photo_rated",
  "develop_edit_applied",
  "photo_exported",
  "export_failed",
  "filter_used",
  "webgpu_unsupported",
  "decode_error",
  "session_ended",
  "first_render_ms",
  "decode_throughput",
]);

// Property keys are allowlisted for the same reason event names are: it keeps
// a future caller from casually sending something identifying. Values are
// buckets and enums, never raw counts, paths or filenames.
const ALLOWED_PROPS = new Set([
  "platform",           // download: macos-arm64 | windows-x86_64 | linux-x86_64 | linux-arm64
  "ms",                 // wasm_loaded: load time
  "reason",             // *_failed / *_error: short enum
  "photo_count_bucket",
  "edit_kind",
  "filter_kind",
  "duration_bucket",
  "ms_bucket",
  "mp_per_s_bucket",
]);

const MAX_BODY_BYTES = 2048;
const MAX_PROPS = 8;
const MAX_VALUE_CHARS = 64;

// Crawlers and uptime monitors, which would otherwise dominate the counts on a
// small site. Not an attempt at bot defence -- just noise removal.
const BOT_UA = /bot|crawl|spider|slurp|headless|preview|lighthouse|pingdom|uptime|monitor/i;

export async function onRequestPost(context) {
  // Every failure path is a silent 204: a visitor's page must never see an
  // error from this, and a prober must never learn anything from it.
  try {
    await record(context.request, context.env);
  } catch (e) {}
  return new Response(null, { status: 204 });
}

// Any other method is not an error worth explaining either.
export async function onRequest() {
  return new Response(null, { status: 204 });
}

async function record(request, env) {
  const url = new URL(request.url);

  // Preview deployments would otherwise mix branch-build traffic into the real
  // numbers. There is only one database, so the filtering happens here.
  if (url.hostname.endsWith(".pages.dev")) return;

  // sendBeacon sends an Origin header on every POST, so a mismatch means the
  // call came from another site. A missing Origin is a non-browser client
  // (curl, a test script) and is allowed through -- it can only write
  // allowlisted names anyway.
  const origin = request.headers.get("Origin");
  if (origin && origin !== url.origin) return;

  const ua = request.headers.get("User-Agent") || "";
  if (BOT_UA.test(ua)) return;
  if (request.headers.get("DNT") === "1" || request.headers.get("Sec-GPC") === "1") return;

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return;

  const body = JSON.parse(raw);
  if (!body || typeof body !== "object") return;
  if (!ALLOWED_EVENTS.has(body.name)) return;

  const ip = request.headers.get("CF-Connecting-IP") || "";
  const now = new Date();
  const day = now.toISOString().slice(0, 10);

  // Fail closed: no salt means no write. An unsalted hash would be one anyone
  // could recompute from a guessed IP, which is the thing this design exists
  // to prevent.
  const salt = await dailySalt(env, day);
  if (!salt) return;

  await env.ANALYTICS.prepare(
    `INSERT INTO events (ts, day, name, path, visitor_hash, referrer_host, country, props)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    Math.floor(now.getTime() / 1000),
    day,
    body.name,
    cleanPath(body.path, body.name),
    await visitorHash(salt, day, ip, ua),
    referrerHost(body.referrer, url.hostname),
    (request.cf && request.cf.country) || null,
    cleanProps(body.name, body.props)
  ).run();

  await prune(env);
}

// The day's salt, generated on first use and read back so that concurrent
// isolates racing to create it all converge on the same winner. Kept in D1
// rather than derived from a long-lived secret: a stored salt can be deleted,
// and once it is, that day's hashes are unreversible even to whoever holds
// this database. A derived salt would leave every past day recomputable for as
// long as the secret existed.
let saltCache = { day: null, salt: null };

async function dailySalt(env, day) {
  if (saltCache.day === day) return saltCache.salt;

  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const candidate = hex(bytes);
  await env.ANALYTICS.prepare("INSERT OR IGNORE INTO salts (day, salt) VALUES (?, ?)")
    .bind(day, candidate).run();
  const row = await env.ANALYTICS.prepare("SELECT salt FROM salts WHERE day = ?")
    .bind(day).first();
  if (!row) return null;

  saltCache = { day, salt: row.salt };
  return row.salt;
}

// Pages Functions have no cron handler, so retention rides on a small fraction
// of requests. Deletes are row writes too, hence the low probability: in steady
// state this removes about one day's worth per day.
async function prune(env) {
  if (Math.random() > 0.002) return;
  const dayMs = 86400000;
  const eventCutoff = new Date(Date.now() - 365 * dayMs).toISOString().slice(0, 10);
  const saltCutoff = new Date(Date.now() - 2 * dayMs).toISOString().slice(0, 10);
  await env.ANALYTICS.batch([
    env.ANALYTICS.prepare("DELETE FROM events WHERE day < ?").bind(eventCutoff),
    env.ANALYTICS.prepare("DELETE FROM salts WHERE day < ?").bind(saltCutoff),
  ]);
}

function hex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// The cookie replacement. The UTC date and that day's random salt are both
// inside the hash, so the identifier for one person changes at midnight and
// today's value cannot be linked to yesterday's: daily uniques work, following
// someone across days does not. One-way, and neither the IP nor the
// User-Agent is ever written to the table.
async function visitorHash(salt, day, ip, ua) {
  const data = new TextEncoder().encode(`${salt}|${day}|${ip}|${ua}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  // 16 hex chars is plenty to separate visitors within a single day, and
  // leaves less to work with if the table ever leaked.
  return hex(new Uint8Array(digest)).slice(0, 16);
}

// Path only. A query string can carry anything a link author put there.
function cleanPath(path, name) {
  // App events have one public route. Never accept a caller-supplied local path.
  if (Object.hasOwn(APP_PROPS, name)) return "/app";
  if (typeof path !== "string" || !path.startsWith("/")) return null;
  return path.split(/[?#]/)[0].slice(0, 128);
}

// Host only, and never our own -- internal navigation is not a referrer worth
// storing, and the full URL of the page someone came from can be personal.
function referrerHost(referrer, ownHost) {
  if (typeof referrer !== "string" || !referrer) return null;
  try {
    const host = new URL(referrer).hostname;
    return host && host !== ownHost ? host.slice(0, 64) : null;
  } catch (e) {
    return null;
  }
}

const APP_PROPS = {
  app_page_view: {}, app_started: {}, first_photo_rendered: {}, photo_rated: {}, photo_exported: {},
  wasm_loaded: { ms: "duration" },
  wasm_load_failed: { reason: ["CompileError", "LinkError", "RuntimeError", "TypeError", "AbortError", "error"] },
  folder_opened: { photo_count_bucket: ["0", "1-99", "100-999", "1000+"] },
  develop_edit_applied: { edit_kind: ["adjustment", "auto_tone", "touch_up"] },
  filter_used: { filter_kind: ["rating", "clear"] },
  webgpu_unsupported: { reason: ["api_missing", "adapter_unavailable"] },
  decode_error: { reason: ["thumbnail", "speed", "preview", "full"] },
  export_failed: { reason: ["export_pipeline"] },
  first_render_ms: { ms_bucket: ["<1s", "1-5s", "5-15s", "15-60s", "60s+"] },
  session_ended: { duration_bucket: ["<30s", "30-120s", "2-10m", "10-30m", "30m+"] },
  // Reserved, not emitted in v1.
  decode_throughput: {},
};

function cleanProps(name, props) {
  if (!props || typeof props !== "object" || Array.isArray(props)) return null;
  const out = {};
  let n = 0;
  for (const key of Object.keys(props)) {
    if (n >= MAX_PROPS) break;
    if (!ALLOWED_PROPS.has(key)) continue;
    const value = props[key];
    if (Object.hasOwn(APP_PROPS, name)) {
      const rule = APP_PROPS[name][key];
      if (rule === "duration") {
        if (!Number.isInteger(value) || value < 0 || value > 86400000) continue;
      } else if (!Array.isArray(rule) || !rule.includes(value)) {
        continue;
      }
    }
    if (typeof value === "number" && Number.isFinite(value)) {
      out[key] = value;
    } else if (typeof value === "string") {
      // Backstop against a future caller -- including the Rust side -- sending
      // something path-shaped by accident. Every legitimate value here is a
      // short enum or bucket label, so anything longer or containing a
      // separator is dropped rather than truncated into the table.
      if (value.length > MAX_VALUE_CHARS || /[\/\\]/.test(value)) continue;
      out[key] = value;
    } else {
      continue;
    }
    n++;
  }
  return n ? JSON.stringify(out) : null;
}
