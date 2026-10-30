// Match conflict rule: first accept wins.
// A match is shown to every student who owns a fitting copy. The first to accept
// claims it for HOLD_HOURS; everyone else sees "taken". If the hold runs out
// before the offer is confirmed, the match reopens for the others.

export const HOLD_HOURS = 24;
export const CURRENT_USER = "me";

// state is undefined (nobody has claimed it) or
// { status: "pending" | "claimed", claimedBy, holdExpiresAt }
// Returns "open", "yours", or "taken".
export function getMatchAvailability(state, userId = CURRENT_USER, now = Date.now()) {
  if (!state) return "open";
  if (state.status === "pending" && now > state.holdExpiresAt) return "open";
  if (state.claimedBy === userId) return "yours";
  return "taken";
}

export function claimMatch(state, userId = CURRENT_USER, now = Date.now()) {
  const availability = getMatchAvailability(state, userId, now);
  if (availability === "taken") return { ok: false, reason: "taken" };
  if (availability === "yours") return { ok: true, state };
  return {
    ok: true,
    state: {
      status: "pending",
      claimedBy: userId,
      holdExpiresAt: now + HOLD_HOURS * 60 * 60 * 1000,
    },
  };
}

export function confirmClaim(state) {
  return { ...state, status: "claimed" };
}