
const DB = "lightphotos-catalogs";
const CATALOGS = "catalogs";
const MARKS = "marks";
function open(name, stores) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(name, 1);
    req.onupgradeneeded = () => {
      for (const store of stores) req.result.createObjectStore(store);
    };
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
// One transaction on `store` of the open `db`. `body` must issue its
// requests without awaiting anything else, or the transaction commits
// under it.
async function txn(db, store, mode, body) {
  const tx = db.transaction(store, mode);
  const done = new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
  const [out] = await Promise.all([body(tx.objectStore(store)), done]);
  return out;
}
async function run(store, mode, body) {
  const db = await open(DB, [CATALOGS, MARKS]);
  try {
    return await txn(db, store, mode, body);
  } finally {
    db.close();
  }
}
export async function catalogNames() {
  const keys = await run(CATALOGS, "readonly", (s) => request(s.getAllKeys()));
  return keys.filter((k) => typeof k === "string");
}
// The stored record as JSON, or null when there is none.
export async function getCatalog(name) {
  const value = await run(CATALOGS, "readonly", (s) => request(s.get(name)));
  return value === undefined ? null : String(JSON.stringify(value));
}
export async function putValue(store, key, json) {
  const value = JSON.parse(json);
  await run(store, "readwrite", (s) => request(s.put(value, key)));
}
export async function deleteValue(store, key) {
  await run(store, "readwrite", (s) => request(s.delete(key)));
}
// Forget the kept handle of `folder` unless a catalog other than `name`
// lists it. True when it was forgotten. The check and the forget run here
// together, so nothing on the Rust side can come between them.
export async function forgetFolderIfUnlisted(name, folder) {
  const [keys, values] = await run(CATALOGS, "readonly", (s) =>
    Promise.all([request(s.getAllKeys()), request(s.getAll())]));
  const lists = (v) => Array.isArray(v?.folders) && v.folders.some((f) =>
    typeof f === "string" && (f === folder || f.startsWith(folder + "/")));
  if (keys.some((k, i) => k !== name && lists(values[i]))) return false;
  const db = await open("lightphotos-folders", ["handles"]);
  try {
    await txn(db, "handles", "readwrite", (s) => request(s.delete("folder:" + folder)));
  } finally {
    db.close();
  }
  return true;
}
