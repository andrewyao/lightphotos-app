// SPDX-License-Identifier: MIT OR Apache-2.0
//
// Structural check of every translation against English. It cannot judge
// wording; it catches what a translator can silently break: a dropped or edited
// link, a lost <strong>, a changed <kbd> or <code>, a missing UI key, a mangled
// {placeholder}.
//
//   node tools/check-i18n.mjs            all languages
//   node tools/check-i18n.mjs de ja      just these
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "i18n");
const ALL = ["zh-CN", "zh-TW", "de", "fr", "ja", "ko"];
const langs = process.argv.length > 2 ? process.argv.slice(2) : ALL;

let problems = 0;
const bad = (where, msg) => {
  problems++;
  console.log(`  ${where}: ${msg}`);
};

const countBy = (items) => {
  const m = new Map();
  for (const i of items) m.set(i, (m.get(i) ?? 0) + 1);
  return m;
};
const diffCounts = (a, b) => {
  const out = [];
  for (const k of new Set([...a.keys(), ...b.keys()])) {
    if ((a.get(k) ?? 0) !== (b.get(k) ?? 0)) out.push(`${k} (en ${a.get(k) ?? 0}, here ${b.get(k) ?? 0})`);
  }
  return out;
};

// Everything outside the frontmatter fence.
const markup = (src) => src.replace(/^---\n[\s\S]*?\n---\n/, "");

// Element-level fingerprint of Astro/HTML prose.
function fingerprint(src) {
  const body = markup(src);
  return {
    hrefs: countBy([...body.matchAll(/href="([^"]*)"/g)].map((m) => m[1])),
    tags: countBy([...body.matchAll(/<([a-zA-Z][a-zA-Z0-9]*)[\s>/]/g)].map((m) => m[1].toLowerCase())),
    classes: countBy([...body.matchAll(/class="([^"]*)"/g)].map((m) => m[1])),
    kbd: countBy([...body.matchAll(/<kbd>([\s\S]*?)<\/kbd>/g)].map((m) => m[1].trim())),
    code: countBy([...body.matchAll(/<code>([\s\S]*?)<\/code>/g)].map((m) => m[1].trim())),
  };
}

function checkProse(lang, rel) {
  const en = readFileSync(join(root, "prose", "en", rel), "utf8");
  const file = join(root, "prose", lang, rel);
  if (!existsSync(file)) return bad(rel, "missing");
  const tr = readFileSync(file, "utf8");
  const a = fingerprint(en);
  const b = fingerprint(tr);
  for (const key of Object.keys(a)) {
    const d = diffCounts(a[key], b[key]);
    if (d.length) bad(rel, `${key} differ: ${d.slice(0, 6).join("; ")}`);
  }
  // Frontmatter code should keep the same imports and top-level shape.
  const fm = (s) => (s.match(/^---\n([\s\S]*?)\n---\n/) ?? [, ""])[1];
  const imports = (s) => fm(s).split("\n").filter((l) => l.startsWith("import "));
  if (imports(en).join() !== imports(tr).join()) bad(rel, "frontmatter imports differ");
  if (/&mdash;|&rsquo;/.test(tr) === false && /—/.test(tr) === false) {
    // not an error: some languages use other punctuation
  }
}

function proseFiles() {
  const out = ["privacy.astro", "terms.astro"];
  for (const f of readdirSync(join(root, "prose", "en", "docs"))) out.push(`docs/${f}`);
  return out;
}

// Flatten a dictionary to dotted paths -> string, so shape and placeholders can
// be compared directly.
function flatten(obj, prefix = "", out = {}) {
  if (typeof obj === "string") out[prefix] = obj;
  else if (Array.isArray(obj)) {
    out[`${prefix}.length`] = String(obj.length);
    obj.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out));
  } else for (const [k, v] of Object.entries(obj)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  return out;
}

async function checkUi(lang) {
  const en = flatten((await import(join(root, "ui", "en.ts"))).en);
  const file = join(root, "ui", `${lang}.ts`);
  if (!existsSync(file)) return bad(`ui/${lang}.ts`, "missing");
  const tr = flatten((await import(file)).default);
  const where = `ui/${lang}.ts`;
  for (const k of Object.keys(en)) {
    if (!(k in tr)) {
      bad(where, `missing key ${k}`);
      continue;
    }
    if (en[k] === tr[k] && /^(nav|footer|home|docs)\./.test(k) && /[a-z]{4}/.test(en[k]) && !k.endsWith(".length")) {
      // Identical to English is legitimate for names and notes; flag it for a look.
      if (!/(github|note|build\.|label)$/i.test(k)) console.log(`  (note) ${where}: ${k} is identical to English`);
    }
    const ph = (s) => [...s.matchAll(/\{\w+\}/g)].map((m) => m[0]).sort().join();
    if (ph(en[k]) !== ph(tr[k])) bad(where, `${k}: placeholders differ`);
    const links = (s) => [...s.matchAll(/(?:href|class)="[^"]*"/g)].map((m) => m[0]).sort().join();
    if (links(en[k]) !== links(tr[k])) bad(where, `${k}: links or classes differ`);
    const tags = (s) => [...s.matchAll(/<\/?([a-z]+)/g)].map((m) => m[0]).sort().join();
    if (tags(en[k]) !== tags(tr[k])) bad(where, `${k}: tags differ`);
  }
  for (const k of Object.keys(tr)) if (!(k in en)) bad(where, `extra key ${k}`);
}

for (const lang of langs) {
  console.log(`${lang}`);
  const before = problems;
  await checkUi(lang);
  for (const rel of proseFiles()) checkProse(lang, rel);
  if (problems === before) console.log("  ok");
}
process.exit(problems ? 1 : 0);
