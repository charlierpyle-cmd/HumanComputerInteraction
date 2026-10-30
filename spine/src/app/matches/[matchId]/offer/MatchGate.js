"use client";

import Link from "next/link";
import { useMatchClaim } from "@/lib/matchState";
import { secondaryButton } from "@/lib/styles";

export default function MatchGate({ matchId, children }) {
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
            Another student with a copy accepted this request first.
          </span>
        </div>
        <Link href="/shelf" className={`mt-auto ${secondaryButton}`}>
          Back to my shelf
        </Link>
      </>
    );
  }

  return children;
}