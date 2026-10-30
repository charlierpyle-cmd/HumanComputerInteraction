"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  CURRENT_USER,
  claimMatch,
  confirmClaim,
  getMatchAvailability,
} from "./matches";

// Prototype only: claims are kept in localStorage. With a real backend this
// would be a server check, so two students could never both win.
const KEY = "spine:match-claims";
const listeners = new Set();

// To demo the "no longer available" screen, put a match id in this list. It
// acts like another student already accepted that match.
const DEMO_TAKEN_BY_OTHERS = [];

const seed = Object.fromEntries(
  DEMO_TAKEN_BY_OTHERS.map((id) => [
    id,
    { status: "pending", claimedBy: "other-student", holdExpiresAt: Number.MAX_SAFE_INTEGER },
  ]),
);

function subscribe(callback) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
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

function getServerRaw() {
  return undefined;
}

function parse(raw) {
  if (raw === null || raw === undefined) return seed;
  try {
    return { ...seed, ...JSON.parse(raw) };
  } catch {
    return seed;
  }
}

function save(claims) {
  try {
    localStorage.setItem(KEY, JSON.stringify(claims));
  } catch {
    // Storage unavailable: the change just won't persist.
  }
  listeners.forEach((listener) => listener());
}

// null until the browser's storage has been read, then { availability }.
export function useMatchClaim(matchId) {
  const raw = useSyncExternalStore(subscribe, getRaw, getServerRaw);
  return useMemo(() => {
    if (raw === undefined) return null;
    return { availability: getMatchAvailability(parse(raw)[matchId]) };
  }, [raw, matchId]);
}

// Try to claim a match for the signed-in student. Returns { ok, reason? }.
export function claimMatchById(matchId) {
  const claims = parse(getRaw());
  const result = claimMatch(claims[matchId]);
  if (result.ok) save({ ...claims, [matchId]: result.state });
  return result;
}

// Call when the offer is actually sent.
export function confirmMatchClaim(matchId) {
  const claims = parse(getRaw());
  if (claims[matchId]?.claimedBy === CURRENT_USER) {
    save({ ...claims, [matchId]: confirmClaim(claims[matchId]) });
  }
}

// Call when the student backs out ("Not interested"), so others can take it.
export function releaseMatchClaim(matchId) {
  const claims = parse(getRaw());
  const current = claims[matchId];
  if (current?.claimedBy === CURRENT_USER && current.status === "pending") {
    const { [matchId]: _released, ...rest } = claims;
    save(rest);
  }
}