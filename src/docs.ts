// One source of truth for the Help section. The sidebar, the breadcrumb, each
// page's <title> and <meta description>, and the Back/Next cards all read
// from this list, in this order — add a topic here and the rest follows.
//
// Slugs become /docs/<slug>.html (astro.config.mjs uses build.format "file").
export type DocTopic = {
  slug: string;
  title: string;
  dek: string;
};

export type DocGroup = {
  name: string;
  topics: DocTopic[];
};

export const docGroups: DocGroup[] = [
  {
    name: "Getting started",
    topics: [
      {
        slug: "open-the-app",
        title: "Open the app",
        dek: "Two ways in — a browser tab or a desktop build — and the same editor over the same files either way.",
      },
      {
        slug: "pick-a-folder",
        title: "Pick a folder",
        dek: "Point LightPhotos at a folder that is already on your disk. There is no import step to sit through.",
      },
      {
        slug: "browse",
        title: "Browse the folder",
        dek: "A grid of thumbnails you can rate, filter and select, decoded as they scroll into view.",
      },
      {
        slug: "select-a-photo",
        title: "Select a photo",
        dek: "Open one photo full size, step through the folder, zoom in and flip between your edit and the original.",
      },
      {
        slug: "adjust",
        title: "Adjust the settings",
        dek: "White balance, tone, presence, detail, touch-ups and crop — every one of them reversible.",
      },
      {
        slug: "export",
        title: "Export",
        dek: "Bake your edits into brand-new JPEGs and leave the originals exactly as they were.",
      },
    ],
  },
  {
    name: "Reference",
    topics: [
      {
        slug: "shortcuts",
        title: "Keyboard shortcuts",
        dek: "Every key LightPhotos listens for, grouped by what you are doing.",
      },
      {
        slug: "formats",
        title: "Supported formats",
        dek: "The files LightPhotos opens, and the three kinds of file it writes next to them.",
      },
    ],
  },
];

// Flattened for prev/next and lookup: the sidebar's reading order is the
// order topics are listed above, straight through both groups.
export const docTopics: DocTopic[] = docGroups.flatMap((g) => g.topics);

export function docHref(slug: string): string {
  return `/docs/${slug}.html`;
}

export function docTopic(slug: string): { topic: DocTopic; group: DocGroup } {
  const group = docGroups.find((g) => g.topics.some((t) => t.slug === slug));
  const topic = group?.topics.find((t) => t.slug === slug);
  if (!group || !topic) throw new Error(`Unknown docs topic: ${slug}`);
  return { topic, group };
}

// Neighbours in reading order. Either end has no card on that side, which
// .lp-article-nav already handles: a lone card keeps its half of the row.
export function docNeighbors(slug: string): { prev?: DocTopic; next?: DocTopic } {
  const i = docTopics.findIndex((t) => t.slug === slug);
  if (i < 0) throw new Error(`Unknown docs topic: ${slug}`);
  return {
    prev: i > 0 ? docTopics[i - 1] : undefined,
    next: i < docTopics.length - 1 ? docTopics[i + 1] : undefined,
  };
}
