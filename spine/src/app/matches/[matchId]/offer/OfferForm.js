"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CONDITIONS } from "@/lib/shelf";
import { primaryButton } from "@/lib/styles";

const labelClass = "text-xs font-semibold text-muted";
const fieldClass = "rounded-lg border border-line bg-white px-3.5 py-3";

// An `error` blocks sending; a `warning` is advice the seller can ignore.
function checkPrice(text, [low, high], buyer) {
  const digits = text.trim().replace(/^\$/, "");
  if (!digits) return { error: "Enter a price." };
  if (!/^\d+$/.test(digits)) return { error: "Use whole dollars, like 20." };
  const price = Number(digits);
  if (price < 1) return { error: "The price has to be at least $1." };
  if (price > high * 2) {
    return {
      warning: `That's well above the typical $${low}–${high}. ${buyer} may pass on it.`,
    };
  }
  return {};
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
  const { error, warning } = checkPrice(price, typicalRange, buyer);
  const showError = checked && error;

  function handleSubmit(event) {
    event.preventDefault();
    setChecked(true);
    if (error) {
      event.currentTarget.elements.price.focus();
      return;
    }
    // No backend yet: sending just advances to the confirmation screen.
    router.push(`/matches/${matchId}/sent`);
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
        className={`text-[13px] placeholder:text-muted ${fieldClass}`}
      />

      <button type="submit" className={`mt-auto ${primaryButton.selling}`}>
        Send offer
      </button>
    </form>
  );
}
