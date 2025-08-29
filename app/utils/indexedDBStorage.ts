// src/utils/indexedDBStorage.ts
import { openDB } from "idb";
import type { Storage } from "redux-persist";

const dbName = "new_project";
const storeName = "redux";

async function getDB() {
  return openDB(dbName, 1, {
    upgrade(db) {
      db.createObjectStore(storeName);
    },
  });
}

export const indexedDBStorage: Storage = {
  async getItem(key) {
    return (await getDB()).get(storeName, key);
  },
  async setItem(key, value) {
    return (await getDB()).put(storeName, value, key);
  },
  async removeItem(key) {
    return (await getDB()).delete(storeName, key);
  },
};
