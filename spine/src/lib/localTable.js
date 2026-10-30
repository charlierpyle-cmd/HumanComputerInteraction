"use client";

import { useSyncExternalStore } from "react";

// Prototype only: the app's data for this visit, kept in memory. A screen that
// reads a table updates as soon as anything changes it, and reloading the page
// (or restarting the app) starts over from the seed rows.

// `serverRows` is what server rendering sees. It defaults to the seed.
export function createTable(seed, serverRows = seed) {
  let rows = seed;
  const listeners = new Set();

  return {
    get: () => rows,
    getServer: () => serverRows,
    set(next) {
      rows = next;
      listeners.forEach((listener) => listener());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

// The table's current rows. Re-renders whenever they change.
export function useTable(table) {
  return useSyncExternalStore(table.subscribe, table.get, table.getServer);
}
