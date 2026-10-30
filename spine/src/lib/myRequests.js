"use client";

import { createTable, useTable } from "./localTable";
import { getRequestSeed } from "./waitlists";

// The student's own "Looking for" requests. Prototype only: they live in this
// visit's local table, so changes show on every screen right away but a reload
// starts over from the seed data.
const requests = createTable(getRequestSeed());

// Live list of requests. Updates after addRequest / updateRequest / deleteRequest.
export function useRequests() {
  return useTable(requests);
}

// One request per course, so posting again replaces instead of duplicating.
export function addRequest(request) {
  const rest = requests.get().filter((r) => r.courseId !== request.courseId);
  requests.set([...rest, request]);
}

export function updateRequest(courseId, changes) {
  requests.set(
    requests.get().map((r) => (r.courseId === courseId ? { ...r, ...changes } : r)),
  );
}

export function deleteRequest(courseId) {
  requests.set(requests.get().filter((r) => r.courseId !== courseId));
}
