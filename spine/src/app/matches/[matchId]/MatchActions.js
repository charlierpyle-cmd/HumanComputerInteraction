"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { claimMatchById, passMatch, useMatchClaim } from "@/lib/matchState";
import { HOLD_HOURS } from "@/lib/matches";
import { card, primaryButton, secondaryButton, textLink } from "@/lib/styles";

export default function MatchActions({ matchId }) {
  const router = useRouter();
  const claim = useMatchClaim(matchId);
  // True from the tap until the offer screen is up, so the button answers.
  const [opening, startOpening] = useTransition();

  if (claim.availability === "taken") {
    return (
      <>
        <div role="status" className={`flex flex-col gap-1 px-4 py-3.5 ${card}`}>
          <span className="text-[15px] font-semibold">No longer available</span>
          <span className="text-sm text-muted">
            Another seller accepted this request first. We’ll tell you when
            someone else needs this book.
          </span>
        </div>
        <Link href="/shelf" className={secondaryButton}>
          Back to My Books
        </Link>
      </>
    );
  }

  function handleOffer() {
    const result = claimMatchById(matchId);
    if (result.ok) startOpening(() => router.push(`/matches/${matchId}/offer`));
  }

  return (
    <>
      <p className="text-sm text-muted">
        {claim.availability === "yours"
          ? "It’s yours to finish: nobody else can accept it while you write your offer."
          : `The first seller to accept gets it, with ${HOLD_HOURS} hours to send an offer.`}
      </p>
      <button
        type="button"
        onClick={handleOffer}
        disabled={opening}
        className={primaryButton.selling}
      >
        {opening ? "Opening…" : "Offer this copy"}
      </button>
      <Link
        href={`/matches/${matchId}/declined`}
        onClick={() => passMatch(matchId)}
        className={`${textLink} text-muted`}
      >
        Not interested
      </Link>
    </>
  );
}
