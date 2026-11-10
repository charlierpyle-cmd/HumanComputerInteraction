"use client";

import Link from "next/link";
import { useMatchClaim } from "@/lib/matchState";
import { card, secondaryButton } from "@/lib/styles";

export default function MatchGate({ matchId, children }) {
  const claim = useMatchClaim(matchId);

  if (claim.availability === "taken") {
    return (
      <>
        <div role="status" className={`flex flex-col gap-1 px-4 py-3.5 ${card}`}>
          <span className="text-[15px] font-semibold">No longer available</span>
          <span className="text-sm text-muted">
            Another seller accepted this request first.
          </span>
        </div>
        <Link href="/shelf" className={`mt-auto ${secondaryButton}`}>
          Back to My Books
        </Link>
      </>
    );
  }

  return children;
}
