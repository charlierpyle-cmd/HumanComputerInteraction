// Match conflict rule: first accept wins.
// A match is open to every student who owns a fitting copy. The first to accept
// claims it; everyone else sees "no longer available". If the claimer doesn't
// confirm within the hold, the match reopens.

export const HOLD_HOURS = 24;

export function isMatchAvailable(match) {
  if (match.status === "open") return true;
  if (match.status === "pending" && match.holdExpiresAt) {
    return Date.now() > match.holdExpiresAt; // hold lapsed, reopened
  }
  return false;
}

export function acceptMatch(match, listingId, acceptedBy) {
  if (!isMatchAvailable(match)) {
    return { ok: false, reason: "taken" };
  }
  return {
    ok: true,
    match: {
      ...match,
      status: "pending",
      claimedListingId: listingId,
      claimedBy: acceptedBy,
      holdExpiresAt: Date.now() + HOLD_HOURS * 60 * 60 * 1000,
    },
  };
}

export function confirmMatch(match) {
  return { ...match, status: "claimed" };
}