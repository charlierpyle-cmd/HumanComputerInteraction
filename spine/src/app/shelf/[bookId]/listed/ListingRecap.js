"use client";

import { formatPrice } from "@/lib/listings";
import { useMyListings } from "@/lib/myListings";

// The confirmation's one-line summary, then the price and condition buyers see,
// so the seller can check them (and take the listing down if they're wrong).
// With no listing this visit, as after a reload, it's just the summary.
export default function ListingRecap({ bookId, summary }) {
  const listing = useMyListings().find((l) => l.bookId === bookId);

  return (
    <>
      {summary}
      {listing && (
        <span className="mt-1.5 block">
          {formatPrice(listing)} · {listing.condition}
        </span>
      )}
    </>
  );
}
