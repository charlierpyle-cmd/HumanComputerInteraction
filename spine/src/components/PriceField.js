"use client";

import { useId } from "react";
import { fieldLabel } from "@/lib/styles";

// One fixed price in dollars, shown to buyers up front: no bidding. `error`
// blocks sending and turns the field red; `warning` is advice the seller can
// ignore; `hint` is an optional line of context under the field. `compact`
// uses smaller text and padding, for a form that has to fit on one screen.
export default function PriceField({
  value,
  onChange,
  onBlur,
  error,
  warning,
  hint,
  compact,
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const messageId = `${id}-message`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={fieldLabel}>
        Price
      </label>
      <span
        className={`flex items-center rounded-lg border bg-white px-3.5 font-semibold focus-within:outline-3 focus-within:outline-offset-2 ${
          compact ? "py-2.5 text-base" : "py-3 text-lg"
        } ${
          error
            ? "border-danger focus-within:outline-danger"
            : "border-line focus-within:outline-ink"
        }`}
      >
        $
        <input
          id={id}
          name="price"
          type="text"
          inputMode="numeric"
          placeholder="20"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${hint ? hintId : ""} ${messageId}`.trim()}
          className="w-full bg-transparent outline-none placeholder:font-normal placeholder:text-muted focus-visible:outline-none"
        />
      </span>
      {hint && (
        <span id={hintId} className={`text-muted ${compact ? "text-xs" : "text-[13px]"}`}>
          {hint}
        </span>
      )}
      <p
        id={messageId}
        role="alert"
        className={`text-sm font-medium empty:hidden ${error ? "text-danger" : "text-amber-900"}`}
      >
        {error || warning || ""}
      </p>
    </div>
  );
}
