
const STORE = "handles";
function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("lightphotos-folders", 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
export async function saveRootHandle(handle) {
  const db = await openDb();
  try {
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(handle, "root");
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}
export async function savedRootHandle() {
  const db = await openDb();
  let handle;
  try {
    handle = await new Promise((resolve, reject) => {
      const req = db.transaction(STORE).objectStore(STORE).get("root");
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  } finally {
    db.close();
  }
  if (!handle) throw new Error("no saved folder");
  const mode = { mode: "readwrite" };
  if ((await handle.queryPermission(mode)) !== "granted"
      && (await handle.requestPermission(mode)) !== "granted") {
    throw new Error("folder access denied");
  }
  return handle;
}
