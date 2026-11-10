"use client";

import Link from "next/link";
import { useRequests } from "@/lib/myRequests";
import { primaryButton, secondaryButton, textLink } from "@/lib/styles";

// Points to a request for the course, unless the student already has one.
// With no copies listed it fills the screen; otherwise it's a footer under the
// copies.
export default function RequestPrompt({ courseId, code, hasCopies }) {
  const looking = useRequests().some((r) => r.courseId === courseId);

  if (!hasCopies) {
    // Nothing to browse: point to a request instead of a dead end.
    return (
      <>
        <p role="status" className="text-[15px]">
          No copies of {code} are listed yet.{" "}
          {looking
            ? "You’ve already requested one, so we’ll tell you when a copy is listed."
            : "Request one and we’ll tell you when someone lists it."}
        </p>
        <div className="mt-auto flex flex-col gap-3 pt-4">
          {!looking && (
            <Link href={`/post/${courseId}`} className={primaryButton.buying}>
              Request a {code} book
            </Link>
          )}
          <Link href="/browse" className={secondaryButton}>
            Pick a different course
          </Link>
        </div>
      </>
    );
  }

  if (looking) return null;

  return (
    <p className="pt-2 text-center text-sm text-muted">
      None of these work?{" "}
      <Link href={`/post/${courseId}`} className={`${textLink} text-buying`}>
        Request a {code} book
      </Link>
    </p>
  );
}
