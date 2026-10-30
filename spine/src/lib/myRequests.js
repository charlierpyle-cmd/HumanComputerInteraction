"use client";

import { useMemo, useSyncExternalStore } from "react";

// The student's own "Looking for" requests. Prototype only: changes are kept in
// localStorage so edits and deletes survive refreshes.

const KEY = "spine:requests";
const listeners = new Set();

function subscribe(callback) {
  listeners.add(callback);
  window.addEventListener("storage", callback); // changes from other tabs
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getRaw() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

// On the server there is no storage, so the value is "unknown" (undefined).
function getServerRaw() {
  return undefined;
}

function parse(raw, seed) {
  if (raw === null || raw === undefined) return seed;
  try {
    return JSON.parse(raw);
  } catch {
    return seed;
  }
}

function save(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // Storage unavailable: the change just won't persist.
  }
  listeners.forEach((listener) => listener());
  return list;
}

// Live list of requests. Returns null until the browser's storage has been read,
// and updates automatically after addRequest / updateRequest / deleteRequest.
export function useRequests(seed) {
  const raw = useSyncExternalStore(subscribe, getRaw, getServerRaw);
  return useMemo(() => (raw === undefined ? null : parse(raw, seed)), [raw, seed]);
}

export function loadRequests(seed) {
  return parse(getRaw(), seed);
}

// One request per course, so posting again replaces instead of duplicating.
export function addRequest(seed, request) {
  const rest = loadRequests(seed).filter((r) => r.courseId !== request.courseId);
  return save([...rest, request]);
}

export function updateRequest(seed, courseId, changes) {
  return save(
    loadRequests(seed).map((r) => (r.courseId === courseId ? { ...r, ...changes } : r)),
  );
}

export function deleteRequest(seed, courseId) {
  return save(loadRequests(seed).filter((r) => r.courseId !== courseId));
}