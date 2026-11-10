"use client";

import Link from "next/link";
import { useId, useLayoutEffect, useState } from "react";
import ScreenHeader from "@/components/ScreenHeader";
import { restoreMatch, withdrawOffer } from "@/lib/matchState";
import { unlistBook } from "@/lib/myListings";
import { deleteRequest } from "@/lib/myRequests";
import { dangerButton, primaryButton, secondaryButton, sides } from "@/lib/styles";

// The end of every task: a checkmark, what just happened, and a way home.
// `undo` ({ label, confirm, doneTitle, doneText, retryHref, retryLabel }) lets
// the user take the action back; the screen then says so in place. With
// `confirm` (a question), the first tap asks before anything is removed. It
// can also name the change to reverse: `removeRequest` (a course id) deletes
// that "Looking for" request, `withdrawOffer` (a match id) reopens a match the
// seller offered on, `restoreMatch` (a match id) brings back a match they
// passed on, and `unlistBook` (a book id) takes that book off Browse.
export default function ConfirmationScreen({ title, side, recap, undo, children }) {
  const [undone, setUndone] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const questionId = useId();

  // Next keeps a page mounted but hidden after you leave it. Reset the undo as
  // it's hidden, so doing the task again doesn't land on the "undone" screen
  // or an open "are you sure?".
  useLayoutEffect(
    () => () => {
      setUndone(false);
      setConfirming(false);
    },
    [],
  );

  function handleUndo() {
    if (undo.removeRequest) deleteRequest(undo.removeRequest);
    if (undo.withdrawOffer) withdrawOffer(undo.withdrawOffer);
    if (undo.restoreMatch) restoreMatch(undo.restoreMatch);
    if (undo.unlistBook) unlistBook(undo.unlistBook);
    setConfirming(false);
    setUndone(true);
  }

  if (undone) {
    return (
      <>
        <ScreenHeader title={undo.doneTitle} side={side} />
        <main className="flex flex-col items-center gap-4 px-5 pt-16 pb-5 text-center">
          <span
            aria-hidden
            className="flex size-[72px] items-center justify-center rounded-full border-2 border-line text-[32px] text-muted"
          >
            ↺
          </span>
          {/* Announced when it appears, and still a heading. */}
          <div role="status" className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold">{undo.doneTitle}</h2>
            <p className="max-w-[300px] text-[15px] leading-6 text-muted">{undo.doneText}</p>
          </div>
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
      <main className="flex flex-col items-center gap-4 px-5 pt-16 pb-5 text-center">
        <span
          aria-hidden
          className={`flex size-[72px] items-center justify-center rounded-full text-[32px] font-bold text-white ${sides[side].bg}`}
        >
          ✓
        </span>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="max-w-[300px] text-[15px] leading-6 text-muted">{children}</p>
        <p className="w-full rounded-lg border border-line bg-card px-4 py-3 text-sm">
          {recap}
        </p>
        <Link href="/" className={primaryButton[side]}>
          Back to Home
        </Link>
        {undo &&
          (confirming ? (
            <div
              role="alertdialog"
              aria-labelledby={questionId}
              className="flex w-full flex-col gap-3 rounded-lg border border-danger/40 bg-white p-4 text-left"
            >
              <p id={questionId} className="text-[15px] font-semibold">
                {undo.confirm}
              </p>
              <button type="button" onClick={handleUndo} className={dangerButton}>
                {undo.label}
              </button>
              <button
                type="button"
                autoFocus
                onClick={() => setConfirming(false)}
                className={secondaryButton}
              >
                Keep it
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => (undo.confirm ? setConfirming(true) : handleUndo())}
              className={secondaryButton}
            >
              {undo.label}
            </button>
          ))}
      </main>
    </>
  );
}
