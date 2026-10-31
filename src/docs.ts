// SPDX-License-Identifier: MIT OR Apache-2.0
//
// The Help section's structure: which topics exist, in what order, under which
// group. Titles and descriptions are per-language and live in
// src/i18n/ui/<lang>.ts under docs.topics. The sidebar, the breadcrumb, each
// page's <title> and <meta description>, and the Back/Next cards all read from
// this list, in this order — add a topic here, then add its prose and its
// strings in every language.
//
// Slugs become /docs/<slug>.html (astro.config.mjs uses build.format "file").
import { localePath, type Locale } from "./i18n/locales";
import { ui } from "./i18n/ui";

export const docGroupSlugs = [
  {
    key: "gettingStarted",
    topics: [
      "open-the-app",
      "pick-a-folder",
      "catalogs",
      "browse",
      "select-a-photo",
      "compare-a-stack",
      "adjust",
      "masks",
      "presets",
      "export",
      "immich",
    ],
  },
  {
    key: "reference",
    topics: ["shortcuts", "formats"],
  },
] as const;

export type DocSlug = (typeof docGroupSlugs)[number]["topics"][number];

export type DocTopic = { slug: DocSlug; title: string; dek: string };
export type DocGroup = { name: string; topics: DocTopic[] };

export const docSlugs: DocSlug[] = docGroupSlugs.flatMap((g) => [...g.topics]);

export function docGroups(locale: Locale): DocGroup[] {
  const { groups, topics } = ui(locale).docs;
  return docGroupSlugs.map((g) => ({
    name: groups[g.key],
    topics: g.topics.map((slug) => ({ slug, ...topics[slug] })),
  }));
}

export function docHref(locale: Locale, slug: string): string {
  return localePath(locale, `/docs/${slug}.html`);
}

export function docTopic(locale: Locale, slug: string): { topic: DocTopic; group: DocGroup } {
  const groups = docGroups(locale);
  const group = groups.find((g) => g.topics.some((t) => t.slug === slug));
  const topic = group?.topics.find((t) => t.slug === slug);
  if (!group || !topic) throw new Error(`Unknown docs topic: ${slug}`);
  return { topic, group };
}

// Neighbours in reading order, straight through both groups. Either end has no
// card on that side, which .lp-article-nav already handles.
export function docNeighbors(locale: Locale, slug: string): { prev?: DocTopic; next?: DocTopic } {
  const flat = docGroups(locale).flatMap((g) => g.topics);
  const i = flat.findIndex((t) => t.slug === slug);
  if (i < 0) throw new Error(`Unknown docs topic: ${slug}`);
  return { prev: flat[i - 1], next: flat[i + 1] };
}
