"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import MatchBadge from "@/components/MatchBadge";
import ScreenHeader from "@/components/ScreenHeader";
import ShelfBook from "@/components/ShelfBook";
import { getCourse } from "@/lib/courses";
import { formatPrice } from "@/lib/listings";
import { useMatches } from "@/lib/matchState";
import { unlistBook, useMyListings } from "@/lib/myListings";
import { useRequests } from "@/lib/myRequests";
import { shelf } from "@/lib/shelf";
import { secondaryButton } from "@/lib/styles";

// A small button on a book card, for what the seller can do with it next.
const shelfAction =
  "mt-1.5 w-fit rounded-md border border-selling px-2.5 py-1 text-xs font-semibold text-selling";

export default function ShelfPage() {
  const matches = useMatches();
  const requests = useRequests();
  const listings = useMyListings();

  return (
    <>
      <ScreenHeader title="My Shelf" backHref="/" side="selling" step="1 of 3" />
      <main className="flex flex-1 flex-col gap-3.5 px-5 pt-6 pb-5">
        <p className="text-sm text-muted">
          Books you’re done with. When a student on a course waitlist needs one,
          it’s flagged here. Books nobody has asked for yet can go up on Browse.
        </p>
        {shelf.map((book) => {
          const { code } = getCourse(book.courseId);
          // Passed and taken matches drop off; the book waits for the next one.
          const match = matches.find(
            ({ bookId, status }) =>
              bookId === book.id && (status === "open" || status === "offered"),
          );

          if (!match) {
            const listing = listings.find(({ bookId }) => bookId === book.id);
            return (
              <ShelfBook key={book.id} book={book} code={code}>
                {listing ? (
                  <>
                    <span className="text-xs text-muted">
                      Listed on Browse for {formatPrice(listing)}. Any student in{" "}
                      {code} can claim it.
                    </span>
                    <button
                      type="button"
                      onClick={() => unlistBook(book.id)}
                      className={shelfAction}
                    >
                      Take it down
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-xs text-muted">
                      No requests yet. We’ll tell you when someone joins the {code}{" "}
                      waitlist, or you can list it now.
                    </span>
                    <Link href={`/shelf/${book.id}/list`} className={shelfAction}>
                      List it on Browse
                    </Link>
                  </>
                )}
              </ShelfBook>
            );
          }

          if (match.status === "offered") {
            return (
              <ShelfBook key={book.id} book={book} code={code}>
                <span className="text-xs text-muted">
                  Offer sent to {match.buyer}. They have about a week to accept.
                </span>
              </ShelfBook>
            );
          }

          return (
            <Link key={book.id} href={`/matches/${match.id}`}>
              <ShelfBook
                book={book}
                code={code}
                highlight
                trailing={
                  <span className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-selling">
                    Review
                    <Icon name="chevron" className="size-4" />
                  </span>
                }
              >
                <span className="mt-1 flex items-center gap-1.5 text-xs">
                  <MatchBadge />
                  {match.buyer} wants this for {code}
                </span>
              </ShelfBook>
            </Link>
          );
        })}

        {/* Your own "Looking for" requests, not the buyer requests above. */}
        <div className="mt-auto flex flex-col gap-2 pt-4">
          <p className="text-center text-xs text-muted">
            {requests.length === 0
              ? "You’re not looking for any books right now."
              : `You’re looking for ${requests.length} book${requests.length > 1 ? "s" : ""} for your own courses.`}
          </p>
          <Link href="/my-requests" className={secondaryButton}>
            Manage my requests
          </Link>
        </div>
      </main>
    </>
  );
}
