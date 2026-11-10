"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import Icon from "@/components/Icon";
import ScreenHeader from "@/components/ScreenHeader";
import ShelfBook from "@/components/ShelfBook";
import { getCourse } from "@/lib/courses";
import { formatPrice } from "@/lib/listings";
import { useMatches } from "@/lib/matchState";
import { unlistBook, useMyListings } from "@/lib/myListings";
import { shelf } from "@/lib/shelf";
import { dangerButton, secondaryButton, sectionHeading } from "@/lib/styles";

// A full-size button on a book card, for what the seller can do with it next.
const bookAction =
  "mt-2 flex min-h-11 w-full items-center justify-center rounded-lg border border-selling bg-white px-3 text-sm font-semibold text-selling transition-colors hover:bg-selling/10";

export default function ShelfPage() {
  const matches = useMatches();
  const listings = useMyListings();
  // The book whose "Take it down" is waiting to be confirmed.
  const [confirmingId, setConfirmingId] = useState(null);

  // Leaving the screen cancels an unanswered "Take it down?".
  useLayoutEffect(() => () => setConfirmingId(null), []);

  // Passed and taken matches drop off; the book waits for the next one.
  const matchFor = (book) =>
    matches.find(
      ({ bookId, status }) => bookId === book.id && (status === "open" || status === "offered"),
    );
  const wanted = shelf.filter(matchFor);
  const others = shelf.filter((book) => !matchFor(book));

  return (
    <>
      <ScreenHeader title="My Books" backHref="/" side="selling" step="1 of 3" />
      <main className="flex flex-1 flex-col gap-3 px-5 pt-5 pb-5">
        {wanted.length > 0 && <h2 className={sectionHeading}>Students want these</h2>}
        {wanted.map((book) => {
          const match = matchFor(book);
          const { code } = getCourse(book.courseId);

          if (match.status === "offered") {
            return (
              <ShelfBook key={book.id} book={book} courseId={book.courseId}>
                <span className="mt-1 text-sm">
                  Offer sent to {match.buyer}. They have about a week to accept.
                </span>
              </ShelfBook>
            );
          }

          return (
            <Link key={book.id} href={`/matches/${match.id}`}>
              <ShelfBook
                book={book}
                courseId={book.courseId}
                highlight
                interactive
                trailing={
                  <span className="flex shrink-0 items-center gap-0.5 text-sm font-semibold text-selling">
                    Review
                    <Icon name="chevron" className="size-4" />
                  </span>
                }
              >
                <span className="mt-1 text-sm font-semibold text-gold-ink">
                  {match.buyer} wants this for {code}
                </span>
              </ShelfBook>
            </Link>
          );
        })}

        <h2 className={`${wanted.length > 0 ? "mt-3" : ""} ${sectionHeading}`}>
          {wanted.length > 0 ? "Your other books" : "Your books"}
        </h2>
        {others.map((book) => {
          const listing = listings.find(({ bookId }) => bookId === book.id);

          if (!listing) {
            return (
              <ShelfBook key={book.id} book={book} courseId={book.courseId}>
                <Link href={`/shelf/${book.id}/list`} className={bookAction}>
                  List it on Browse
                </Link>
              </ShelfBook>
            );
          }

          return (
            <ShelfBook key={book.id} book={book} courseId={book.courseId}>
              <span className="mt-1 text-sm font-semibold text-selling">
                On Browse for {formatPrice(listing)} · {listing.condition}
              </span>
              {confirmingId === book.id ? (
                <span role="alertdialog" aria-label="Take it down?" className="mt-2 flex flex-col gap-2">
                  <span className="text-sm">
                    Take it down? Students won’t see it on Browse anymore.
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      unlistBook(book.id);
                      setConfirmingId(null);
                    }}
                    className={dangerButton}
                  >
                    Take it down
                  </button>
                  <button
                    type="button"
                    autoFocus
                    onClick={() => setConfirmingId(null)}
                    className={secondaryButton}
                  >
                    Keep it listed
                  </button>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmingId(book.id)}
                  className={bookAction}
                >
                  Take it down
                </button>
              )}
            </ShelfBook>
          );
        })}
      </main>
    </>
  );
}
