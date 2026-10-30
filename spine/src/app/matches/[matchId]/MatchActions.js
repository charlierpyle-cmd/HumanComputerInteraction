"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { claimMatchById, releaseMatchClaim, useMatchClaim } from "@/lib/matchState";
import { HOLD_HOURS } from "@/lib/matches";
import { primaryButton, secondaryButton, textLink } from "@/lib/styles";

export default function MatchActions({ matchId }) {
  const router = useRouter();
  const claim = useMatchClaim(matchId);

  if (!claim) return null;

  if (claim.availability === "taken") {
    return (
      <>
        <div
          role="status"
          className="flex flex-col gap-1 rounded-lg border border-line bg-card px-4 py-3.5"
        >
          <span className="text-sm font-semibold">No longer available</span>
          <span className="text-xs text-muted">
            Another student with a copy accepted this request first. We’ll tell
            you when someone else is looking for this book.
          </span>
        </div>
        <Link href="/shelf" className={secondaryButton}>
          Back to my shelf
        </Link>
      </>
    );
  }

  function handleOffer() {
    const result = claimMatchById(matchId);
    if (result.ok) router.push(`/matches/${matchId}/offer`);
  }

  return (
    <>
      <p className="text-xs text-muted">
        {claim.availability === "yours"
          ? "You’ve claimed this request. Nobody else can accept it while you finish your offer."
          : `Other students with this book may have been matched too. The first to accept gets it, and you’ll have ${HOLD_HOURS} hours to finish your offer.`}
      </p>
      <button type="button" onClick={handleOffer} className={primaryButton.selling}>
        Offer this copy
      </button>
      <Link
        href={`/matches/${matchId}/declined`}
        onClick={() => releaseMatchClaim(matchId)}
        className={`${textLink} text-muted`}
      >
        Not interested
      </Link>
    </>
  );
}