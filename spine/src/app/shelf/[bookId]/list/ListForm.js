"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { formatPrice, parsePrice } from "@/lib/listings";
import { listBook, useMyListings } from "@/lib/myListings";
import { CONDITIONS } from "@/lib/shelf";
import { primaryButton, secondaryButton } from "@/lib/styles";

const labelClass = "text-xs font-semibold text-muted";
const fieldClass = "rounded-lg border border-line bg-white px-3.5 py-3";

// Lists a shelf book on Browse for its course, with no buyer request needed.
export default function ListForm({ book, code }) {
  const router = useRouter();
  const listings = useMyListings();
  const [price, setPrice] = useState("");
  // Errors wait until the seller leaves the field or tries to list.
  const [checked, setChecked] = useState(false);
  // True from the tap until the next screen is up, so the button answers right
  // away. It also keeps the form showing meanwhile, instead of the "already
  // listed" notice the new listing would bring up. A transition, not state, so
  // it ends on its own: Next keeps this page mounted after it's left.
  const [listing, startListing] = useTransition();
  const { error, price: amount } = parsePrice(price);
  const showError = checked && error;

  function handleSubmit(event) {
    event.preventDefault();
    if (listing) return;
    setChecked(true);
    if (error) {
      event.currentTarget.elements.price.focus();
      return;
    }
    const data = new FormData(event.currentTarget);
    listBook(book, { condition: String(data.get("condition")), price: amount });
    startListing(() => router.push(`/shelf/${book.id}/listed`));
  }

  const existing = !listing && listings.find(({ bookId }) => bookId === book.id);

  if (existing) {
    // Already on Browse: listing again would only duplicate it.
    return (
      <>
        <div
          role="status"
          className="flex flex-col gap-1 rounded-lg border border-selling/40 bg-selling/10 px-4 py-3.5"
        >
          <span className="text-sm font-semibold">This book is already on Browse</span>
          <span className="text-xs text-muted">
            Listed for {formatPrice(existing)}, {existing.condition.toLowerCase()}. You
            can take it down from My Shelf.
          </span>
        </div>
        <div className="mt-auto flex flex-col gap-3">
          <Link href="/shelf" className={primaryButton.selling}>
            Back to my shelf
          </Link>
          <Link href={`/browse/${book.courseId}`} className={secondaryButton}>
            See {code} copies
          </Link>
        </div>
      </>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3.5">
      <label htmlFor="condition" className={labelClass}>
        Condition
      </label>
      <select
        id="condition"
        name="condition"
        defaultValue={book.condition}
        className={`text-sm ${fieldClass}`}
      >
        {CONDITIONS.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <label htmlFor="price" className={labelClass}>
        Price
      </label>
      {/* One fixed price, shown to buyers up front — no bidding. */}
      <div
        className={`flex flex-col gap-1 focus-within:outline-2 focus-within:outline-offset-2 ${fieldClass} ${
          showError ? "border-red-700 focus-within:outline-red-700" : "focus-within:outline-selling"
        }`}
      >
        <span className="flex text-base font-semibold">
          $
          <input
            id="price"
            name="price"
            type="text"
            inputMode="numeric"
            placeholder="20"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            onBlur={() => setChecked(true)}
            aria-invalid={showError ? true : undefined}
            aria-describedby="price-hint price-message"
            className="w-full bg-transparent outline-none placeholder:font-normal placeholder:text-muted"
          />
        </span>
        <span id="price-hint" className="text-[11px] text-muted">
          Whole dollars. Buyers see this price before they claim it.
        </span>
      </div>
      <p
        id="price-message"
        role="alert"
        className="-mt-1.5 text-xs font-medium text-red-700 empty:hidden"
      >
        {showError ? error : ""}
      </p>

      <p className="text-xs text-muted">
        Any student browsing {code} copies can claim it. You can take it down
        from My Shelf at any time.
      </p>

      <button
        type="submit"
        disabled={listing}
        className={`mt-auto ${primaryButton.selling}`}
      >
        {listing ? "Listing…" : "List on Browse"}
      </button>
    </form>
  );
}
