"use client";

import { useSentOffer } from "@/lib/matchState";

// The confirmation's one-line summary, then what the seller actually sent, so
// they can check it (and withdraw it if it's wrong). With no offer sent this
// visit, as after a reload, it's just the summary.
export default function OfferRecap({ matchId, buyer, summary }) {
  const offer = useSentOffer(matchId);

  return (
    <>
      {summary}
      {offer && (
        <span className="mt-1.5 block">
          ${offer.price} · {offer.condition}
        </span>
      )}
      {offer?.note && (
        <span className="mt-1 block text-muted">
          Your note to {buyer}: “{offer.note}”
        </span>
      )}
    </>
  );
}
