// SPDX-License-Identifier: MIT OR Apache-2.0
//
// The blog posts, newest first. The index page (src/pages/[...lang]/blogs.astro)
// renders one card per entry; each post's title and blurb are per-language, in
// src/i18n/ui/<lang>.ts under `blogs.posts`, keyed by slug. The posts themselves
// (src/pages/[...lang]/blogs/<slug>.astro) are English in every language.
export const posts = [
  { slug: "three-ways-to-cull-a-shoot-with-mcp", date: "2026-10-23", minutes: 5, cover: "three-ways-to-cull-a-shoot-with-mcp.svg" },
  { slug: "your-next-power-user-cant-see-the-screen", date: "2026-10-17", minutes: 6, cover: "your-next-power-user-cant-see-the-screen.svg" },
  { slug: "lightphotos-and-rapidraw-on-the-mac", date: "2026-10-16", minutes: 6, cover: "lightphotos-and-rapidraw-on-the-mac.svg" },
  { slug: "two-raw-decoders", date: "2026-10-15", minutes: 6, cover: "two-raw-decoders.svg" },
  { slug: "raw-camera-support", date: "2026-10-15", minutes: 4, cover: "raw-camera-support.svg" },
  { slug: "catalogs", date: "2026-10-13", minutes: 4, cover: "catalogs.webp" },
  { slug: "lightroom-alternative", date: "2026-10-08", minutes: 3, cover: "lightroom-alternative.webp" },
  { slug: "linux-raw-photo-editor", date: "2026-10-08", minutes: 2, cover: "linux-raw-photo-editor.webp" },
  { slug: "two-rust-photo-apps-on-the-mac", date: "2026-10-07", minutes: 7, cover: "two-rust-photo-apps-on-the-mac.webp" },
  { slug: "two-rust-photo-apps-in-the-browser", date: "2026-10-07", minutes: 6, cover: "two-rust-photo-apps-in-the-browser.webp" },
  { slug: "exporting-to-your-own-immich-server", date: "2026-09-26", minutes: 6, cover: "exporting-to-your-own-immich-server.webp" },
  { slug: "challenges-with-webassembly", date: "2026-09-26", minutes: 7, cover: "challenges-with-webassembly.webp" },
  { slug: "my-plan", date: "2026-09-20", minutes: 5, cover: "my-plan.webp" },
  { slug: "measuring-a-gui-app", date: "2026-09-15", minutes: 4, cover: "measuring-a-gui-app.webp" },
  { slug: "never-load-the-whole-folder", date: "2026-09-01", minutes: 5, cover: "never-load-the-whole-folder.webp" },
  { slug: "six-queues-and-a-reserved-worker", date: "2026-08-20", minutes: 4, cover: "six-queues-and-a-reserved-worker.webp" },
  { slug: "where-your-data-lives", date: "2026-08-10", minutes: 5, cover: "where-your-data-lives.webp" },
  { slug: "what-imageio-gives-you-free", date: "2026-07-20", minutes: 5, cover: "what-imageio-gives-you-free.webp" },
  { slug: "how-a-photo-gets-on-screen", date: "2026-07-08", minutes: 5, cover: "how-a-photo-gets-on-screen.webp" },
  { slug: "learning-rust-while-the-agents-write-it", date: "2026-07-02", minutes: 7, cover: "learning-rust-while-the-agents-write-it.webp" },
  { slug: "why-rust", date: "2026-06-28", minutes: 4, cover: "why-rust.webp" },
  { slug: "why-i-started-lightphotos", date: "2026-06-23", minutes: 3, cover: "why-i-started-lightphotos.webp" },
] as const;

export type PostSlug = (typeof posts)[number]["slug"];
