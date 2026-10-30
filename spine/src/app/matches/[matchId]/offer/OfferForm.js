"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { parsePrice } from "@/lib/listings";
import { claimMatchById, confirmMatchClaim } from "@/lib/matchState";
import { CONDITIONS } from "@/lib/shelf";
import { primaryButton } from "@/lib/styles";

const labelClass = "text-xs font-semibold text-muted";
const fieldClass = "rounded-lg border border-line bg-white px-3.5 py-3";

// An `error` blocks sending; a `warning` is advice the seller can ignore.
function checkPrice(text, [low, high], buyer) {
  const result = parsePrice(text);
  if (result.error || result.price <= high * 2) return result;
  return {
    ...result,
    warning: `That's well above the typical $${low}–${high}. ${buyer} may pass on it.`,
  };
}

export default function OfferForm({
  matchId,
  buyer,
  condition,
  suggestedPrice,
  typicalRange,
}) {
  const router = useRouter();
  const [price, setPrice] = useState(String(suggestedPrice));
  // Errors wait until the seller leaves the field or tries to send.
  const [checked, setChecked] = useState(false);
  // True if another student claimed this match while the form was open.
  const [taken, setTaken] = useState(false);
  // True from the tap until the next screen is up, so the button answers right
  // away and a second tap can't send it again. A transition, not state, so it
  // ends on its own: Next keeps this page mounted after it's left.
  const [sending, startSending] = useTransition();
  const { error, warning, price: amount } = checkPrice(price, typicalRange, buyer);
  const showError = checked && error;

  function handleSubmit(event) {
    event.preventDefault();
    if (sending) return;
    setChecked(true);
    if (error) {
      event.currentTarget.elements.price.focus();
      return;
    }
    // First accept wins: make sure the match is still ours before sending.
    const claim = claimMatchById(matchId);
    if (!claim.ok) {
      setTaken(true);
      return;
    }
    const data = new FormData(event.currentTarget);
    confirmMatchClaim(matchId, {
      price: amount,
      condition: String(data.get("condition")),
      note: String(data.get("note") ?? "").trim(),
    });
    // No backend yet: sending just advances to the confirmation screen.
    startSending(() => router.push(`/matches/${matchId}/sent`));
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3.5">
      <label htmlFor="condition" className={labelClass}>
        Condition
      </label>
      <select
        id="condition"
        name="condition"
        defaultValue={condition}
        className={`text-sm ${fieldClass}`}
      >
        {CONDITIONS.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <label htmlFor="price" className={labelClass}>
        Price
      </label>
      {/* One fixed price, shown to the buyer up front — no bidding. */}
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
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            onBlur={() => setChecked(true)}
            aria-invalid={showError ? true : undefined}
            aria-describedby="price-hint price-message"
            className="w-full bg-transparent outline-none"
          />
        </span>
        <span id="price-hint" className="text-[11px] text-muted">
          Typical price for this book: ${typicalRange[0]}–{typicalRange[1]}
        </span>
      </div>
      <p
        id="price-message"
        role="alert"
        className={`-mt-1.5 text-xs font-medium empty:hidden ${showError ? "text-red-700" : "text-amber-800"}`}
      >
        {showError ? error : warning}
      </p>

      <label htmlFor="note" className={labelClass}>
        Note to {buyer} (optional)
      </label>
      <input
        id="note"
        type="text"
        name="note"
        placeholder="Add a note…"
        aria-describedby="note-hint"
        className={`text-[13px] placeholder:text-muted ${fieldClass}`}
      />
      <span id="note-hint" className="-mt-2 text-[11px] text-muted">
        Sent to {buyer} along with your price and condition.
      </span>

      <p role="alert" className="text-xs font-medium text-red-700 empty:hidden">
        {taken
          ? "Another student with a copy accepted this request first, so your offer wasn’t sent."
          : ""}
      </p>

      <button
        type="submit"
        disabled={sending}
        className={`mt-auto ${primaryButton.selling}`}
      >
        {sending ? "Sending…" : "Send offer"}
      </button>
    </form>
  );
}