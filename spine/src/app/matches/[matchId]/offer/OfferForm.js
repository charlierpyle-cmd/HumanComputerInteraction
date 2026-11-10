"use client";

import { useRouter } from "next/navigation";
import { useId, useState, useTransition } from "react";
import ChoiceGroup from "@/components/ChoiceGroup";
import PriceField from "@/components/PriceField";
import { parsePrice } from "@/lib/listings";
import { claimMatchById, confirmMatchClaim } from "@/lib/matchState";
import { CONDITION_OPTIONS } from "@/lib/shelf";
import { fieldInput, fieldLabel, primaryButton } from "@/lib/styles";

// An `error` blocks sending; a `warning` is advice the seller can ignore.
function checkPrice(text, [low, high], buyer) {
  const result = parsePrice(text);
  if (result.error || result.price <= high * 2) return result;
  return {
    ...result,
    warning: `That’s well above the typical $${low}–${high}. ${buyer} may pass on it.`,
  };
}

// Like listing on Browse, the seller picks the condition themselves.
export default function OfferForm({ matchId, buyer, suggestedPrice, typicalRange }) {
  const router = useRouter();
  const noteId = useId();
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState(String(suggestedPrice));
  // Price errors wait until the seller leaves the field or tries to send;
  // a missing condition is pointed out when they try to send.
  const [priceChecked, setPriceChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // True if another student claimed this match while the form was open.
  const [taken, setTaken] = useState(false);
  // True from the tap until the next screen is up, so the button answers right
  // away and a second tap can't send it again. A transition, not state, so it
  // ends on its own: Next keeps this page mounted after it's left.
  const [sending, startSending] = useTransition();
  const { error, warning, price: amount } = checkPrice(price, typicalRange, buyer);
  const conditionError = submitted && !condition ? "Choose the book’s condition." : "";

  function handleSubmit(event) {
    event.preventDefault();
    if (sending) return;
    setSubmitted(true);
    setPriceChecked(true);
    const { elements } = event.currentTarget;
    if (!condition) {
      elements.condition[0].focus();
      return;
    }
    if (error) {
      elements.price.focus();
      return;
    }
    // First accept wins: make sure the match is still ours before sending.
    const claim = claimMatchById(matchId);
    if (!claim.ok) {
      setTaken(true);
      return;
    }
    confirmMatchClaim(matchId, {
      price: amount,
      condition,
      note: String(new FormData(event.currentTarget).get("note") ?? "").trim(),
    });
    // No backend yet: sending just advances to the confirmation screen.
    startSending(() => router.push(`/matches/${matchId}/sent`));
  }

  return (
    // Compact so the whole form and its button fit on one phone screen, even
    // with the condition and price messages showing.
    <form noValidate onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3">
      <ChoiceGroup
        legend="Condition"
        name="condition"
        side="selling"
        options={CONDITION_OPTIONS}
        value={condition}
        onChange={setCondition}
        error={conditionError}
        compact
      />

      <PriceField
        compact
        value={price}
        onChange={setPrice}
        onBlur={() => setPriceChecked(true)}
        error={priceChecked ? error : ""}
        warning={warning}
        hint={`Typical price for this book: $${typicalRange[0]}–${typicalRange[1]}`}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor={noteId} className={fieldLabel}>
          Note to {buyer} (optional)
        </label>
        <input
          id={noteId}
          type="text"
          name="note"
          placeholder="Add a note…"
          aria-describedby={`${noteId}-hint`}
          className={fieldInput}
        />
        <span id={`${noteId}-hint`} className="text-xs text-muted">
          Sent to {buyer} along with your price and condition.
        </span>
      </div>

      <p role="alert" className="text-sm font-medium text-danger empty:hidden">
        {taken ? "Another seller accepted this request first, so your offer wasn’t sent." : ""}
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
