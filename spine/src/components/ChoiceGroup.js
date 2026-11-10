"use client";

import { useId } from "react";
import { fieldLabel, sides } from "@/lib/styles";

// A labeled set of large radio buttons: picking is one tap, nothing to type,
// and every option is visible at once. Controlled when `value` is given,
// otherwise it starts from `defaultValue` (none picked if that's empty).
// `error` shows under the options; the form focuses the first one.
// `compact` uses smaller text and padding, for a form that has to fit on one
// screen; options stay at least 44px tall.
export default function ChoiceGroup({
  legend,
  name,
  options,
  side,
  value,
  defaultValue,
  onChange,
  error,
  compact,
}) {
  const errorId = useId();

  return (
    <fieldset
      className="flex flex-col gap-2"
      aria-describedby={error ? errorId : undefined}
    >
      <legend className={`mb-2 ${fieldLabel}`}>{legend}</legend>
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center gap-3 rounded-lg border bg-white px-3.5 transition-colors hover:border-ink/50 ${
            compact ? "py-2" : "py-3"
          } ${
            sides[side].checked
          } ${error ? "border-danger" : "border-line"}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            {...(value === undefined
              ? { defaultChecked: option.value === defaultValue }
              : { checked: option.value === value, onChange: () => onChange(option.value) })}
            className={`size-5 shrink-0 ${sides[side].radio}`}
          />
          <span className="flex flex-col">
            <span className={`font-medium ${compact ? "text-sm" : "text-[15px]"}`}>
              {option.label}
            </span>
            {option.description && (
              <span className={`text-muted ${compact ? "text-xs" : "text-[13px]"}`}>
                {option.description}
              </span>
            )}
          </span>
        </label>
      ))}
      <p
        id={errorId}
        role="alert"
        className="text-sm font-medium text-danger empty:hidden"
      >
        {error || ""}
      </p>
    </fieldset>
  );
}
