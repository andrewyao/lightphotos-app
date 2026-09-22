# Browser app analytics

The WASM app calls `window.lpTrack(name, props)` on the main browser thread.
The existing client sends best-effort requests to `/api/e`, a Pages Function
that stores allowlisted events in the `ANALYTICS` D1 binding. Missing scripts,
blocked requests and database failures never interrupt photo work. Native
builds contain no analytics transport. DNT and GPC suppress collection.

## Events

| Event | Meaning / properties |
| --- | --- |
| app_page_view | Browser app page opened |
| wasm_loaded / wasm_load_failed | Module import + initialization result; elapsed `ms` or fixed failure `reason` |
| app_started | Renderer and app initialized, once per page load |
| folder_opened | Successfully loaded folder; `photo_count_bucket`: 0, 1-99, 100-999, 1000+ |
| first_photo_rendered | First successfully presented frame containing a thumbnail or loupe image |
| first_render_ms | Time from Rust startup to that frame; `ms_bucket`: <1s, 1-5s, 5-15s, 15-60s, 60s+ |
| photo_rated | Rating changed; one event per single or bulk action, not per bulk target |
| develop_edit_applied | Committed adjustment gesture, completed Auto Tone batch or touch-up; `edit_kind`: adjustment, auto_tone, touch_up |
| filter_used | Rating filter changed; `filter_kind`: rating, clear |
| photo_exported / export_failed | One event per output write result; failure `reason`: export_pipeline |
| decode_error | Terminal failure for an active photo; deduplicated across decode stages per photo until folder load; `reason`: thumbnail, speed, preview, full |
| webgpu_unsupported | Missing browser API or unavailable adapter; `reason`: api_missing, adapter_unavailable |
| session_ended | Existing pagehide event with bucketed duration |

First-photo timing includes time spent choosing a folder. It is not a decode
benchmark. Startup progression is aggregate event counts, not joined sessions
or an exact conversion funnel. Delivery is best effort, so counts are estimates.
Browser photos, filenames, paths, EXIF and raw error text never enter event
properties. App route is fixed to `/app` at intake. Existing daily visitor hashes
are pseudonymous, not a guarantee of anonymity. No new visitor IDs are added.

## Setup and rollout

The current Wrangler file contains a placeholder database ID. These commands
are deployment steps, not performed by the implementation:

1. Run `npx wrangler d1 create lightphotos_analytics` if the database does not
   already exist, then set its real ID in `wrangler.toml`.
2. Run `npx wrangler d1 migrations apply lightphotos_analytics --remote`.
   Existing migrations are reused; this change needs no new schema migration.
3. From the lightphotos checkout run `./scripts/deploy-web.sh` to build and
   copy WASM assets into this site checkout. Review those generated changes.
4. Build and deploy through the site's existing Pages workflow. Confirm the
   production deployment has the `ANALYTICS` binding. Preview `.pages.dev`
   traffic is intentionally discarded.
5. Open `/app`, choose a test folder, rate a photo, commit an edit, and export.
   Check `/api/e` requests and stored rows using the SQL command below. A 204
   alone does not prove storage: the endpoint also returns 204 for drops/errors.

For local integration use `npx wrangler d1 migrations apply lightphotos_analytics
--local`, `pnpm build`, and `npx wrangler pages dev dist`. Keep all local tests on
local D1. No Cloudflare account token belongs in browser code.

## Reports and tests

- `python3 tools/stats.py --days 7` reports usage and reliability from production;
  add `--local` for the local database.
- `node --test tests/analytics.test.mjs` checks intake validation, opt-outs,
  storage failure handling and browser beacon fallback without credentials.
- `npx wrangler d1 execute lightphotos_analytics --local --command "SELECT name,
  COUNT(*) AS n FROM events GROUP BY name"` verifies local ingestion. Use
  `--remote` only when intentionally reading production.
- For browser acceptance, check missing and throwing `lpTrack`, blocked `/api/e`,
  cancelled picks, corrupt photos, and a failed export. Redraws, slider motion,
  catalog hydration and intermediate retries must not add events.

To disable collection without a WASM rebuild, replace `window.lpTrack` with a
no-op in the site client. Analytics Engine, dashboards and decode-throughput
instrumentation are outside this implementation.
