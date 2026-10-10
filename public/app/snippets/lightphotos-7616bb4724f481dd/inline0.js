
const STORE = "handles";
const PREFIX = "folder:";
const LEGACY = "root";
function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("lightphotos-folders", 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
function request(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
// One transaction. `body` must issue its requests without awaiting anything
// else, or the transaction commits under it.
async function run(mode, body) {
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, mode);
    const done = new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
    const out = await body(tx.objectStore(STORE));
    await done;
    return out;
  } finally {
    db.close();
  }
}
function uniqueName(base, taken) {
  if (!taken.includes(base)) return base;
  for (let n = 2; ; n++) {
    const name = `${base} (${n})`;
    if (!taken.includes(name)) return name;
  }
}
// Every kept folder as [name, handle], after moving the legacy entry.
async function keptFolders() {
  const [keys, handles] = await run("readonly", (s) =>
    Promise.all([request(s.getAllKeys()), request(s.getAll())]));
  const kept = [];
  let legacy = null;
  keys.forEach((key, i) => {
    if (key === LEGACY) legacy = handles[i];
    else if (typeof key === "string" && key.startsWith(PREFIX)) {
      kept.push([key.slice(PREFIX.length), handles[i]]);
    }
  });
  if (legacy) {
    const name = uniqueName(legacy.name, kept.map(([n]) => n));
    await run("readwrite", (s) => {
      s.put(legacy, PREFIX + name);
      s.delete(LEGACY);
    });
    kept.push([name, legacy]);
  }
  return kept;
}
export async function savedFolderNames() {
  return (await keptFolders()).map(([name]) => name);
}
// The kept name of `handle`'s folder, keeping it under a new unique name
// if it isn't kept yet.
export async function keepFolder(handle) {
  const kept = await keptFolders();
  for (const [name, other] of kept) {
    if (await other.isSameEntry(handle)) return name;
  }
  const name = uniqueName(handle.name, kept.map(([n]) => n));
  await run("readwrite", (s) => { s.put(handle, PREFIX + name); });
  return name;
}
export async function grantedFolder(name, ask) {
  await keptFolders();
  const handle = await run("readonly", (s) => request(s.get(PREFIX + name)));
  if (!handle) throw new Error("no saved folder");
  const mode = { mode: "readwrite" };
  if ((await handle.queryPermission(mode)) !== "granted"
      && (!ask || (await handle.requestPermission(mode)) !== "granted")) {
    throw new Error("folder access denied");
  }
  return handle;
}
export async function forgetFolder(name) {
  await run("readwrite", (s) => { s.delete(PREFIX + name); });
}
