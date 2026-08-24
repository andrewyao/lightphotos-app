// SPDX-License-Identifier: MIT OR Apache-2.0
import { defineConfig } from "astro/config";

// Static site, default output ("static") builds to dist/. build.format
// "file" emits downloads.astro -> downloads.html (not downloads/index.html)
// to match the old hand-assembled pages and the /downloads.html links
// baked into the nav and app.html.
export default defineConfig({
  build: {
    format: "file",
  },
});
