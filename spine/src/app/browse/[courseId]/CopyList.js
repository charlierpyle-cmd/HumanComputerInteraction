"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import ShelfBook from "@/components/ShelfBook";
import { formatPrice, getFitProblems, isFree } from "@/lib/listings";
import { isMine, useListings } from "@/lib/myListings";
import RequestPrompt from "./RequestPrompt";

// The copies listed for a course, live, so one the student lists from their
// shelf shows up here straight away.
export default function CopyList({ courseId, code }) {
  const listings = useListings().filter((l) => l.courseId === courseId);

  return (
    <>
      {listings.length > 0 && (
        <p className="text-[13px] text-muted">
          These are copies people have already listed. Pick one to request it
          from its owner.
        </p>
      )}
      {listings.map((listing) => {
        const book = {
          title: listing.title,
          condition: `${listing.condition} · ${listing.seller} · ${formatPrice(listing)}`,
        };

        // Your own copy can't be claimed; it's managed from your shelf.
        if (isMine(listing)) {
          return (
            <Link key={listing.id} href="/shelf">
              <ShelfBook
                book={book}
                code={code}
                trailing={<Icon name="chevron" className="size-4 text-muted" />}
              >
                <span className="mt-1 w-fit rounded bg-selling/10 px-1.5 py-0.5 text-[10px] font-bold text-selling">
                  Your listing
                </span>
              </ShelfBook>
            </Link>
          );
        }

        const fits = getFitProblems(listing).length === 0;
        return (
          <Link key={listing.id} href={`/browse/${courseId}/${listing.id}`}>
            <ShelfBook
              book={book}
              code={code}
              trailing={<Icon name="chevron" className="size-4 text-muted" />}
            >
              <span className="mt-1 flex flex-wrap gap-1">
                <span
                  className={`w-fit rounded px-1.5 py-0.5 text-[10px] font-bold ${
                    fits ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-900"
                  }`}
                >
                  {fits ? "✓ Fits your section" : "! May not fit your section"}
                </span>
                {isFree(listing) && (
                  <span className="w-fit rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-800">
                    Free
                  </span>
                )}
                {listing.status === "pending" && (
                  <span className="w-fit rounded bg-gray-200 px-1.5 py-0.5 text-[10px] font-bold text-gray-700">
                    Request pending
                  </span>
                )}
              </span>
            </ShelfBook>
          </Link>
        );
      })}
      <RequestPrompt courseId={courseId} code={code} hasCopies={listings.length > 0} />
    </>
  );
}
