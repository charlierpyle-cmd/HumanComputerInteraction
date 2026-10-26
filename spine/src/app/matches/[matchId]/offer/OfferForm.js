"use client";

import { useRouter } from "next/navigation";
import { CONDITIONS } from "@/lib/shelf";
import { primaryButton } from "@/lib/styles";

const labelClass = "text-xs font-semibold text-muted";
const fieldClass = "rounded-lg border border-line bg-white px-3.5 py-3";

export default function OfferForm({
  matchId,
  buyer,
  condition,
  suggestedPrice,
  typicalPrice,
}) {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    // No backend yet: sending just advances to the confirmation screen.
    router.push(`/matches/${matchId}/sent`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3.5">
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
        className={`flex flex-col gap-1 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-selling ${fieldClass}`}
      >
        <span className="flex text-base font-semibold">
          $
          <input
            id="price"
            name="price"
            type="text"
            inputMode="numeric"
            pattern="[0-9]+"
            required
            defaultValue={suggestedPrice}
            aria-describedby="price-hint"
            className="w-full bg-transparent outline-none"
          />
        </span>
        <span id="price-hint" className="text-[11px] text-muted">
          Typical price for this book: {typicalPrice}
        </span>
      </div>

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
