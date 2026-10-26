"use client";

import { useRouter } from "next/navigation";
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
      <span className={labelClass}>Condition</span>
      <div className={`flex items-center justify-between text-sm ${fieldClass}`}>
        {condition}
        {/* Decorative: the condition comes from the shelf listing. */}
        <span className="text-xs font-semibold text-gold">Change</span>
      </div>

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
