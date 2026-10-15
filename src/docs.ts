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
        slug: "catalogs",
        title: "Catalogs",
        dek: "Keep separate lists of folders, such as family photos and client work, and switch between them from the header.",
      },
      {
        slug: "browse",
        title: "Browse the folder",
        dek: "A grid of thumbnails you can rate, filter and select, decoded as they scroll into view.",
      },
      {
        slug: "select-a-photo",
        title: "Select a photo",
        dek: "The grid is for deciding; the Loupe is for working on one photo at full size.",
      },
      {
        slug: "compare-a-stack",
        title: "Compare photos",
        dek: "Group a burst into one stack, or select up to six photos, and compare every frame at the same spot.",
      },
      {
        slug: "adjust",
        title: "Adjust the settings",
        dek: "Tone, color mixing and grading, detail, effects and crop — every one of them reversible.",
      },
      {
        slug: "masks",
        title: "Masks",
        dek: "Adjust part of a photo: a gradient, an ellipse, or a subject or sky found for you, plus Touch Up for spots.",
      },
      {
        slug: "presets",
        title: "Presets",
        dek: "Put a saved look on many photos in one click, and use your Lightroom presets straight from their folders.",
      },
      {
        slug: "export",
        title: "Export",
        dek: "Bake your edits into new JPEG, PNG, TIFF, WebP or AVIF files, and leave the originals exactly as they were.",
      },
      {
        slug: "immich",
        title: "Immich server",
        dek: "Upload finished photos from the desktop app to any Immich server you host yourself.",
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
        dek: "The files LightPhotos opens on each platform — including the one macOS gets on its own — the three kinds of file it writes next to them, and the catalog that lists your folders.",
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
