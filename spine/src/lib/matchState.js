"use client";

import { useMemo } from "react";
import { createTable, useTable } from "./localTable";
import {
  CURRENT_USER,
  claimMatch,
  confirmClaim,
  getMatchAvailability,
} from "./matches";
import { getMatches } from "./shelf";

// Prototype only: claims live in this visit's local table, so a reload starts
// over. With a real backend this would be a server check, so two students
// could never both win.

// To demo the "no longer available" screen, put a match id in this list. It
// acts like another student already accepted that match.
const DEMO_TAKEN_BY_OTHERS = [];

// matchId -> claim state (see lib/matches.js). The server renders as if
// nothing is claimed: checking a hold reads the clock, which Next can't
// prerender. The browser picks up the real claims as soon as it loads.
const claims = createTable(
  Object.fromEntries(
    DEMO_TAKEN_BY_OTHERS.map((id) => [
      id,
      { status: "pending", claimedBy: "other-student", holdExpiresAt: Number.MAX_SAFE_INTEGER },
    ]),
  ),
  {},
);

// Ids of matches the student said "Not interested" to.
const passed = createTable([]);

function availabilityOf(claim) {
  return claim ? getMatchAvailability(claim) : "open";
}

// Where a match stands for the student: "open" (waiting on their reply),
// "offered", "passed", or "taken" (another student accepted first).
function statusOf(claim, isPassed) {
  const availability = availabilityOf(claim);
  if (availability === "taken") return "taken";
  if (availability === "yours" && claim.status === "claimed") return "offered";
  return isPassed ? "passed" : "open";
}

// { availability } for one match: "open", "yours" or "taken".
export function useMatchClaim(matchId) {
  const all = useTable(claims);
  return useMemo(() => ({ availability: availabilityOf(all[matchId]) }), [all, matchId]);
}

// Every match on the student's shelf, each with its live `status`.
export function useMatches() {
  const all = useTable(claims);
  const passedIds = useTable(passed);
  return useMemo(
    () =>
      getMatches().map((match) => ({
        ...match,
        status: statusOf(all[match.id], passedIds.includes(match.id)),
      })),
    [all, passedIds],
  );
}

// Try to claim a match for the signed-in student. Returns { ok, reason? }.
export function claimMatchById(matchId) {
  const all = claims.get();
  const result = claimMatch(all[matchId]);
  if (result.ok) {
    claims.set({ ...all, [matchId]: result.state });
    restoreMatch(matchId); // offering on a passed match takes the pass back
  }
  return result;
}

// Call when the offer is actually sent. The offer ({ price, condition, note })
// is kept with the claim so the confirmation screen can show it back.
export function confirmMatchClaim(matchId, offer) {
  const all = claims.get();
  if (all[matchId]?.claimedBy === CURRENT_USER) {
    claims.set({ ...all, [matchId]: { ...confirmClaim(all[matchId]), offer } });
  }
}

// The offer the student sent on a match this visit, or undefined.
export function useSentOffer(matchId) {
  return useTable(claims)[matchId]?.offer;
}

// Call when the student backs out ("Not interested"). Frees an unsent claim so
// others can take it, and takes the match off their shelf.
export function passMatch(matchId) {
  const { [matchId]: claim, ...rest } = claims.get();
  if (claim?.claimedBy === CURRENT_USER && claim.status === "pending") {
    claims.set(rest);
  }
  if (!passed.get().includes(matchId)) passed.set([...passed.get(), matchId]);
}

// Undo for passMatch.
export function restoreMatch(matchId) {
  if (passed.get().includes(matchId)) {
    passed.set(passed.get().filter((id) => id !== matchId));
  }
}

// Undo for a sent offer: the match is open again, for everyone.
export function withdrawOffer(matchId) {
  const { [matchId]: claim, ...rest } = claims.get();
  if (claim?.claimedBy === CURRENT_USER) claims.set(rest);
}
