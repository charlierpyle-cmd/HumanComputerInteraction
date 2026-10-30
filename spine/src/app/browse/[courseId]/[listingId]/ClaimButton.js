"use client";

import Link, { useLinkStatus } from "next/link";
import { useState } from "react";
import { primaryButton, secondaryButton } from "@/lib/styles";

// A claim link's label. It changes the moment the link is tapped, while the
// next screen loads.
function ClaimLabel({ children }) {
  const { pending } = useLinkStatus();
  return pending ? "Claiming…" : children;
}

// Claims straight away when the copy fits. When it may not, the first tap
// spells out why and makes going back the easy choice.
export default function ClaimButton({ claimHref, backHref, problems }) {
  const [warned, setWarned] = useState(false);

  if (problems.length === 0) {
    return (
      <Link href={claimHref} className={`mt-auto ${primaryButton.buying}`}>
        <ClaimLabel>Claim this copy</ClaimLabel>
      </Link>
    );
  }

  if (!warned) {
    return (
      <button
        type="button"
        onClick={() => setWarned(true)}
        className={`mt-auto ${primaryButton.buying}`}
      >
        Claim this copy
      </button>
    );
  }

  return (
    <div
      role="alert"
      className="mt-auto flex flex-col gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4"
    >
      <p className="text-sm font-semibold text-amber-900">
        This copy may not work for your section
      </p>
      <ul className="list-disc pl-4 text-xs text-amber-900">
        {problems.map((problem) => (
          <li key={problem}>{problem}</li>
        ))}
      </ul>
      <Link href={backHref} className={primaryButton.buying}>
        See other copies
      </Link>
      <Link href={claimHref} className={secondaryButton}>
        <ClaimLabel>Claim anyway</ClaimLabel>
      </Link>
    </div>
  );
}
