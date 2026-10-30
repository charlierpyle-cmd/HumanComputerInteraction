"use client";

import Link from "next/link";
import { useState } from "react";
import ScreenHeader from "@/components/ScreenHeader";
import { deleteRequest } from "@/lib/myRequests";
import { primaryButton, secondaryButton, sides } from "@/lib/styles";

// The end of every task: a checkmark, what just happened, and a way home.
// `undo` ({ label, doneTitle, doneText, retryHref, retryLabel, removeRequest })
// lets the user take the action back; the screen then says so in place.
// `removeRequest` ({ courseId, seed }) also deletes that "Looking for" request.
export default function ConfirmationScreen({ title, side, recap, undo, children }) {
  const [undone, setUndone] = useState(false);

  function handleUndo() {
    if (undo.removeRequest) {
      deleteRequest(undo.removeRequest.seed, undo.removeRequest.courseId);
    }
    setUndone(true);
  }

  if (undone) {
    return (
      <>
        <ScreenHeader title={undo.doneTitle} side={side} />
        <main className="flex flex-col items-center gap-4 px-5 pt-20 pb-5 text-center">
          <span
            aria-hidden
            className="flex size-[72px] items-center justify-center rounded-full border-2 border-line text-[32px] text-muted"
          >
            ↺
          </span>
          <h2 role="status" className="text-[22px] font-semibold">
            {undo.doneTitle}
          </h2>
          <p className="max-w-[280px] text-[13px] leading-5 text-muted">
            {undo.doneText}
          </p>
          <Link href={undo.retryHref} className={primaryButton[side]}>
            {undo.retryLabel}
          </Link>
          <Link href="/" className={secondaryButton}>
            Back to Home
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <ScreenHeader title={title} side={side} />
      <main className="flex flex-col items-center gap-4 px-5 pt-20 pb-5 text-center">
        <span
          aria-hidden
          className={`flex size-[72px] items-center justify-center rounded-full text-[32px] font-bold text-white ${sides[side].bg}`}
        >
          ✓
        </span>
        <h2 className="text-[22px] font-semibold">{title}</h2>
        <p className="max-w-[280px] text-[13px] leading-5 text-muted">
          {children}
        </p>
        <p className="rounded-lg border border-line bg-card px-4 py-3 text-xs">
          {recap}
        </p>
        <Link href="/" className={primaryButton[side]}>
          Back to Home
        </Link>
        {undo && (
          <button
            type="button"
            onClick={handleUndo}
            className={secondaryButton}
          >
            {undo.label}
          </button>
        )}
      </main>
    </>
  );
}