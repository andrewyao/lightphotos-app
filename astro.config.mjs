// SPDX-License-Identifier: MIT OR Apache-2.0
import { defineConfig } from "astro/config";

// The app's decode threads share one wasm memory, which a browser only hands
// to a Worker on a cross-origin isolated page. Production gets these headers
// from public/_headers, which `astro dev` and `astro preview` never read.
// `server.headers` is not enough: the static server leaves them off a 304, so
// a reload came back not isolated and the first thread spawn panicked. Setting
// them ahead of every handler covers the 304 too.
const isolation = (_req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
};

// Static site, default output ("static") builds to dist/. build.format
// "file" emits downloads.astro -> downloads.html (not downloads/index.html)
// to match the old hand-assembled pages and the /downloads.html links
// baked into the nav and app.html.
export default defineConfig({
  build: {
    format: "file",
  },
  vite: {
    plugins: [
      {
        name: "cross-origin-isolation",
        configureServer(server) {
          server.middlewares.use(isolation);
        },
        configurePreviewServer(server) {
          server.middlewares.use(isolation);
        },
      },
    ],
  },
});
