"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ChoiceGroup from "@/components/ChoiceGroup";
import PriceField from "@/components/PriceField";
import { formatPrice, parsePrice } from "@/lib/listings";
import { listBook, useMyListings } from "@/lib/myListings";
import { CONDITION_OPTIONS } from "@/lib/shelf";
import { primaryButton, secondaryButton } from "@/lib/styles";

// Lists a book from My Books on Browse for its course, with no buyer request
// needed. The seller has to pick the condition themselves: nothing is chosen
// for them, so a listing never claims a condition nobody checked.
export default function ListForm({ book, code }) {
  const router = useRouter();
  const listings = useMyListings();
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  // Price errors wait until the seller leaves the field or tries to list;
  // a missing condition is pointed out when they try to list.
  const [priceChecked, setPriceChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // True from the tap until the next screen is up, so the button answers right
  // away. It also keeps the form showing meanwhile, instead of the "already
  // listed" notice the new listing would bring up. A transition, not state, so
  // it ends on its own: Next keeps this page mounted after it's left.
  const [listing, startListing] = useTransition();
  const { error: priceError, price: amount } = parsePrice(price);
  const conditionError = submitted && !condition ? "Choose the book’s condition." : "";

  function handleSubmit(event) {
    event.preventDefault();
    if (listing) return;
    setSubmitted(true);
    setPriceChecked(true);
    const { elements } = event.currentTarget;
    if (!condition) {
      elements.condition[0].focus();
      return;
    }
    if (priceError) {
      elements.price.focus();
      return;
    }
    listBook(book, { condition, price: amount });
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
          <span className="text-[15px] font-semibold">This book is already on Browse</span>
          <span className="text-sm text-muted">
            Listed for {formatPrice(existing)}, {existing.condition.toLowerCase()}. You
            can take it down from My Books.
          </span>
        </div>
        <div className="mt-auto flex flex-col gap-3">
          <Link href="/shelf" className={primaryButton.selling}>
            Back to My Books
          </Link>
          <Link href={`/browse/${book.courseId}`} className={secondaryButton}>
            See {code} copies
          </Link>
        </div>
      </>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4">
      <ChoiceGroup
        legend="Condition"
        name="condition"
        side="selling"
        options={CONDITION_OPTIONS}
        value={condition}
        onChange={setCondition}
        error={conditionError}
      />
      <PriceField
        value={price}
        onChange={setPrice}
        onBlur={() => setPriceChecked(true)}
        error={priceChecked ? priceError : ""}
      />
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
