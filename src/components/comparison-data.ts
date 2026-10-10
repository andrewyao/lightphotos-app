export type TimingRow = {
  app: string;
  times: number[];
};

export type TimingScenario = {
  id: string;
  label: string;
  explanation: string;
  rows: TimingRow[];
};

export const browserTimings: TimingScenario[] = [
  {
    id: "next", label: "Next photo",
    explanation: "Both apps prepare the next photo ahead of time. LightCraft's photo is sharp at 0.12 s; its histogram continues changing until 1.70 s. The photo does not change during that interval.",
    rows: [
      { app: "LightPhotos", times: [0.07, 0.07, 0.13] },
      { app: "LightCraft", times: [0.05, 0.12, 1.70] },
    ],
  },
  {
    id: "open", label: "Open from the grid",
    explanation: "This photo has not been prepared. LightPhotos first shows the camera's JPEG; LightCraft first shows a preview. The sharp photo arrives at 1.37 s and 3.60 s respectively.",
    rows: [
      { app: "LightPhotos", times: [0.15, 1.37, 1.37] },
      { app: "LightCraft", times: [0.06, 3.60, 3.60] },
    ],
  },
];

export const macTimings: TimingScenario[] = [
  {
    id: "open", label: "Open first photo",
    explanation: "The first photo has not been prepared. These measurements record the first visible change and when the whole window stops changing; they do not identify when the photo becomes sharp.",
    rows: [
      { app: "LightPhotos", times: [0.57, 1.46] },
      { app: "LightCraft", times: [0.67, 0.67] },
    ],
  },
  {
    id: "next", label: "Next photo",
    explanation: "Both apps prepare neighbouring photos. The 0.55 s and 0.60 s results are at the measurement floor: this method cannot resolve a meaningful difference between them.",
    rows: [
      { app: "LightPhotos", times: [0.55, 0.55] },
      { app: "LightCraft", times: [0.60, 0.60] },
    ],
  },
];

export const storageScenarios = [
  {
    id: "open", label: "Open 20 photos", copied: true,
    lp: { status: "Folder read in place", detail: "0 MB of originals copied. The browser asks for access to the folder." },
    lc: { status: "Originals copied", detail: "498 MB copied into browser storage. The copy is included in the measured 2.3 s to fill the grid." },
    summary: "LightPhotos reads your folder. LightCraft creates a separate copy in browser storage.",
  },
  {
    id: "reload", label: "Reload the page", copied: true,
    lp: { status: "Folder access required", detail: "Reopen the session and grant access again, unless you allowed access on every visit. Ratings and edits remain on disk." },
    lc: { status: "Library retained", detail: "The imported library opens again without a folder-access prompt." },
    summary: "LightCraft retains its library. LightPhotos needs folder access again unless permission was saved for every visit.",
  },
  {
    id: "clear", label: "Clear site data", copied: false,
    lp: { status: "Edits remain on disk", detail: "Ratings, edits and thumbnails remain in .lightphotos beside the originals. Folder access is required to reopen them." },
    lc: { status: "Library removed", detail: "The browser's copies, catalog and saved edits are removed. Edits you have not exported are lost." },
    summary: "Clearing site data removes the browser library. Original files and LightPhotos' saved data on disk remain.",
  },
  {
    id: "other", label: "Firefox or Safari", copied: true,
    lp: { status: "Folder access unsupported", detail: "LightPhotos cannot open the folder in these browsers. The original files and saved edits remain on disk." },
    lc: { status: "File import supported", detail: "LightCraft can import files using the file dialog and browser storage. Each browser keeps its own library; an existing Chrome library does not transfer." },
    summary: "LightPhotos' folder access requires Chrome or Edge. LightCraft can import into a separate library in Firefox or Safari.",
  },
];
