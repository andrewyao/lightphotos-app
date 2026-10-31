// SPDX-License-Identifier: MIT OR Apache-2.0
//
// English UI strings, and the shape every other language in this folder must
// match. Strings containing markup (<a>, <kbd>, <strong>) are rendered as HTML;
// they are written by us, never from user input. `{os}`, `{title}` and `{v}`
// are placeholders and must survive translation unchanged.
//
// Where the text names a control in the app, use the app's own label for that
// language (src/i18n/glossary/<lang>.tsv), not a fresh translation.
export const en = {
  nav: {
    main: "Main",
    downloads: "Downloads",
    openInBrowser: "Open in browser",
    blogs: "Blogs",
    help: "Help",
    github: "LightPhotos on GitHub",
    language: "Language",
    theme: "Theme",
    themeLight: "Light",
    themeNeutral: "Neutral gray",
    themeDark: "Dark",
  },

  footer: {
    author: "Author: Andrew Yao",
    feedback: "Feedback",
    privacy: "Privacy",
    terms: "Terms",
    licenses: "Licenses",
    version: "Version: {v}",
    build: "Build {v}",
  },

  docs: {
    pageTitle: "{title} — LightPhotos Help",
    navTitle: "Documentation",
    help: "Help",
    back: "Back",
    next: "Next",
    moreTopics: "More topics",
    shortcutsNote:
      "Shortcuts are written the macOS way &mdash; on Windows and Linux, read <kbd>Cmd</kbd> as <kbd>Ctrl</kbd>. Press <kbd>?</kbd> inside the app for the list as your own machine shows it.",
    redirectTitle: "LightPhotos Help",
    redirecting: "Opening the LightPhotos documentation…",
    redirectLink: "Getting started: Open the app",
    groups: {
      gettingStarted: "Getting started",
      reference: "Reference",
    },
    topics: {
      "open-the-app": {
        title: "Open the app",
        dek: "Two ways in — a browser tab or a desktop build — and the same editor over the same files either way.",
      },
      "pick-a-folder": {
        title: "Pick a folder",
        dek: "Point LightPhotos at a folder that is already on your disk. There is no import step to sit through.",
      },
      catalogs: {
        title: "Catalogs",
        dek: "Keep separate lists of folders, such as family photos and client work, and switch between them from the header.",
      },
      browse: {
        title: "Browse the folder",
        dek: "A grid of thumbnails you can rate, filter and select, decoded as they scroll into view.",
      },
      "select-a-photo": {
        title: "Select a photo",
        dek: "The grid is for deciding; the Loupe is for working on one photo at full size.",
      },
      "compare-a-stack": {
        title: "Compare photos",
        dek: "Group a burst into one stack, or select up to six photos, and compare every frame at the same spot.",
      },
      adjust: {
        title: "Adjust the settings",
        dek: "Tone, color mixing and grading, detail, effects and crop — every one of them reversible.",
      },
      masks: {
        title: "Masks",
        dek: "Adjust part of a photo: a gradient, an ellipse, or a subject or sky found for you, plus Touch Up for spots.",
      },
      presets: {
        title: "Presets",
        dek: "Put a saved look on many photos in one click, and use your Lightroom presets straight from their folders.",
      },
      export: {
        title: "Export",
        dek: "Bake your edits into new JPEG, PNG, TIFF, WebP or AVIF files, and leave the originals exactly as they were.",
      },
      immich: {
        title: "Immich server",
        dek: "Upload finished photos from the desktop app to any Immich server you host yourself.",
      },
      shortcuts: {
        title: "Keyboard shortcuts",
        dek: "Every key LightPhotos listens for, grouped by what you are doing.",
      },
      formats: {
        title: "Supported formats",
        dek: "The files LightPhotos opens on each platform — including the one macOS gets on its own — the three kinds of file it writes next to them, and the catalog that lists your folders.",
      },
    },
  },

  home: {
    title: "LightPhotos — a free, open-source Lightroom alternative for RAW photos",
    desc: "Cull, rate, edit and export RAW photos fast. A free, open-source alternative to Lightroom for macOS, Windows, Linux and the browser (desktop Chrome or Edge). No subscription, no account, and your photos and edits never leave your computer.",
    tagline: "Cull and edit RAW photos fast.",
    lede: "A free, open-source Lightroom alternative for macOS, Windows, Linux and the browser (desktop Chrome or Edge). Your photos and edits never leave your computer.",
    download: "Download",
    downloadFor: "Download for {os}",
    openInBrowser: "Open in browser",
    github: "GitHub",
    demoOpen: "Play the demo larger",
    demoDialog: "LightPhotos demo",
    demoClose: "Close",
    demoDescription:
      "Opening a folder of garden and desert photos, browsing them, developing a bridge photo with the tone sliders, comparing a stack of four orchid shots at 100 percent, rating and color-labeling in the grid, then exporting the four-star-and-up photos",
    featuresAria: "What LightPhotos does",
    features: {
      noImports: {
        title: "No imports",
        text: "Open any folder on your disk. No import, no copying. Edits stay next to your photos, and the originals are never modified.",
        link: "Where your data lives",
      },
      fast: {
        title: "Fast",
        text: "Renders on the GPU. Written entirely in Rust. Native RAW decoding on macOS desktop.",
        link: "Why Rust",
      },
      formats: {
        title: "File formats",
        text: "Sony, Canon, Nikon, Fujifilm, Panasonic, Olympus, Pentax, Leica, phone DNGs, JPEG, TIFF and HEIC (Mac app).",
        link: "Supported formats",
      },
      batch: {
        title: "Batch edits",
        text: "Apply presets, including your Lightroom ones, copy adjustments, set stars and labels, and pick or reject many photos at once.",
        link: "Presets",
      },
      compare: {
        title: "Compare a stack",
        text: "Stack a burst, then see every frame side by side, zoomed to the same spot. Keep the sharpest.",
        link: "Compare a stack",
      },
      export: {
        title: "Export & Immich",
        text: "Export finished photos as JPEGs to another local folder, or your own Immich server (Desktop only).",
        link: "How it works",
      },
    },
    actionsAria: "Keep exploring",
    blogsCard: {
      title: "Blogs",
      text: "The journey of building LightPhotos and its RAW engine.",
    },
    helpCard: {
      title: "Help",
      text: "User guides, supported formats, keyboard shortcuts.",
    },
  },

  downloads: {
    title: "Download LightPhotos",
    desc: "Download the LightPhotos desktop app for macOS, Windows and Linux. Native builds for Apple Silicon, x86-64 and ARM64 — free, offline and under 12 MB.",
    // The heading is drawn in two weights; the split can fall anywhere in the word.
    headingLead: "Down",
    headingLight: "loads",
    gridAria: "Desktop builds",
    builds: {
      "macos-arm64": {
        label: "Download for Apple Silicon",
        steps: ["Open the .dmg and drag LightPhotos into your Applications folder."],
      },
      "macos-x86_64": {
        label: "Download for Intel Mac",
        steps: ["Open the .dmg and drag LightPhotos into your Applications folder."],
      },
      "windows-x86_64": {
        label: "Download for Windows",
        steps: [
          "Unzip the archive anywhere. Inside is one lightphotos.exe, with no installer to sit through.",
          "SmartScreen warns about an unrecognized publisher the first time you run it.",
          "Choose More info, then Run anyway. You will not see it again.",
        ],
      },
      "linux-x86_64": {
        label: "Download for Linux x86",
        note: "Ubuntu 24.04+, Debian 13, Fedora 40+",
        steps: ["Extract the tarball and run the binary inside. Nothing to install, nothing to configure."],
      },
      "linux-arm64": {
        label: "Download for Linux ARM",
        note: "Ubuntu 24.04+, Debian 13, Fedora 40+",
        steps: ["Extract the tarball and run the binary inside. Nothing to install, nothing to configure."],
      },
    },
    showOnlyMine: "Show only my platform",
    anotherPlatform: "Looking for another platform?",
    sharedTag: "Nothing here fits?",
    shared: [
      'On something else entirely? The <a href="/app.html">web app</a> is the same editor, in any browser with WebGPU',
      'Want release notes or an older version? Every build is on the <a href="https://github.com/andrewyao/lightphotos/releases">GitHub releases page</a>',
      'Found a bug or have an idea? <a href="https://github.com/andrewyao/lightphotos/issues">Open an issue on GitHub</a>',
      "Either way your photos stay on disk. Your edits are saved in a small file inside a .lightphotos subfolder, so if you move a folder somewhere else, all of its edits travel with it",
    ],
  },

  blogs: {
    pageTitle: "LightPhotos Blogs",
    desc: "Write-ups on why LightPhotos exists and how it is built.",
    heading: "Blogs",
    sortAria: "Sort posts",
    newest: "Newest first",
    oldest: "Oldest first",
    minRead: "{n} min read",
    englishOnly: "Posts are written in English.",
    posts: {
      "three-ways-to-cull-a-shoot-with-mcp": {
        title: "Three ways to let AI cull a shoot",
        blurb: "Culling is the boring part. I handed it to AI three ways: the app score, a local model, and Claude Code. Pros, cons, and how to try each.",
      },
      "your-next-power-user-cant-see-the-screen": {
        title: "Your next power user can’t see the screen",
        blurb: "Accessibility lets people with disabilities use the app. MCP lets an agent use it for a power user. Both need the same list of commands.",
      },
      "lightphotos-and-rapidraw-on-the-mac": {
        title: "LightPhotos and RapidRAW on the Mac",
        blurb: "Two Rust apps that read folders in place. Both keep RAW pixels in floating point. One prepares the next photo at the window size, and one keeps every RAW at full size.",
      },
      "two-raw-decoders": {
        title: "Two RAW decoders, side by side",
        blurb: "rawler and LightCraft's own decoder: one fixed pipeline against five stages, a body table against the DNG colour model.",
      },
      "raw-camera-support": {
        title: "Which cameras do LightPhotos and LightCraft support?",
        blurb: "18 RAW files, camera support, and why processing at preview size changes the time.",
      },
      "catalogs": {
        title: "Catalogs, a first version",
        blurb: "Named lists of folders you switch between from the header. Your edits still live next to your photos.",
      },
      "lightroom-alternative": {
        title: "A free, open-source alternative to Lightroom",
        blurb: "LightPhotos and Lightroom side by side: where LightPhotos wins, and what it does not do yet.",
      },
      "linux-raw-photo-editor": {
        title: "A fast RAW photo editor for Linux",
        blurb: "Lightroom has no Linux app. LightPhotos has native ARM and x86 builds.",
      },
      "two-rust-photo-apps-on-the-mac": {
        title: "Two Rust photo apps on the Mac",
        blurb: "The same comparison on the desktop. LightPhotos uses Apple's ImageIO, and LightCraft uses its own decoders.",
      },
      "two-rust-photo-apps-in-the-browser": {
        title: "Two Rust photo apps in the browser",
        blurb: "LightPhotos and LightCraft side by side, with the same twenty RAW files.",
      },
      "exporting-to-your-own-immich-server": {
        title: "Exporting to your own Immich server",
        blurb: "How LightPhotos uploads finished photos to the Immich server that you choose.",
      },
      "challenges-with-webassembly": {
        title: "Challenges with WebAssembly",
        blurb: "What broke when the Rust app moved into a browser tab.",
      },
      "my-plan": {
        title: "My plan, and what is not in it",
        blurb: "Where LightPhotos will go, and what it will never become.",
      },
      "measuring-a-gui-app": {
        title: "Measuring a GUI app without lying to yourself",
        blurb: "A repeatable way to measure a GUI app, with no guesses.",
      },
      "never-load-the-whole-folder": {
        title: "Never load the whole folder",
        blurb: "Why the first version of a photo browser ran out of memory.",
      },
      "six-queues-and-a-reserved-worker": {
        title: "Six queues and a reserved worker",
        blurb: "How background decoding stays fast when the app is busy.",
      },
      "where-your-data-lives": {
        title: "Your data lives where you are allowed to write",
        blurb: "Why photos, edits and metadata stay in ordinary folders.",
      },
      "what-imageio-gives-you-free": {
        title: "What ImageIO gives you free, and what it costs to leave",
        blurb: "What ImageIO gives you, and what it costs to make the app portable.",
      },
      "how-a-photo-gets-on-screen": {
        title: "How a photo gets on screen",
        blurb: "The path from a RAW file to pixels on your display.",
      },
      "learning-rust-while-the-agents-write-it": {
        title: "Learning Rust while the agents write it",
        blurb: "A practical process to learn Rust while agents write the code.",
      },
      "why-rust": {
        title: "Why Rust",
        blurb: "The architecture decision behind LightPhotos.",
      },
      "why-i-started-lightphotos": {
        title: "Why I started LightPhotos",
        blurb: "The lost photo library that started a small photo editor.",
      },
    },
  },

  pages: {
    privacy: {
      title: "Privacy — LightPhotos",
      desc: "What LightPhotos counts on this website, what it deliberately does not, and why the desktop app makes no network requests at all.",
    },
    terms: {
      title: "Terms — LightPhotos",
      desc: "The terms for using the LightPhotos website, browser app and desktop app, in plain language.",
    },
  },
};

export type UI = typeof en;
