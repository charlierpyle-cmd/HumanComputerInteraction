"use client";

import Link from "next/link";
import { useRequests } from "@/lib/myRequests";
import { primaryButton, secondaryButton, textLink } from "@/lib/styles";

// Points to a "Looking for" request for the course, unless the student already
// has one. With no copies listed it fills the screen; otherwise it's a footer
// under the copies.
export default function RequestPrompt({ courseId, code, hasCopies }) {
  const looking = useRequests().some((r) => r.courseId === courseId);

  if (!hasCopies) {
    // Nothing to browse: point to a "Looking for" request instead of a dead end.
    return (
      <>
        <p role="status" className="text-sm text-muted">
          No copies of {code} are listed yet.{" "}
          {looking
            ? "You’re already looking for one, so we’ll tell you when a copy is listed."
            : "Post a “Looking for” request and we’ll tell you when one is."}
        </p>
        <div className="mt-auto flex flex-col gap-3">
          {!looking && (
            <Link href={`/post/${courseId}`} className={primaryButton.buying}>
              Post a “Looking for” request
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
    <p className="pt-2 text-center text-[13px] text-muted">
      None of these work?{" "}
      <Link href={`/post/${courseId}`} className={`${textLink} text-buying`}>
        Post a “Looking for” request
      </Link>
    </p>
  );
}
