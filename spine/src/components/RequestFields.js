"use client";

import { useId } from "react";
import ChoiceGroup from "@/components/ChoiceGroup";
import { CURRENT_TERM } from "@/lib/courses";
import { MIN_CONDITION_OPTIONS, bookOptions } from "@/lib/requestOptions";
import { fieldInput, fieldLabel } from "@/lib/styles";

// The fields of a "Looking for" request, shared by posting one and editing it.
// `request` holds the values to start from when editing.
export default function RequestFields({ course, request }) {
  const noteId = useId();
  const books = bookOptions(course);

  return (
    <>
      {books.length > 0 ? (
        <ChoiceGroup
          legend="Which book do you need?"
          name="book"
          side="buying"
          options={books}
          defaultValue={request?.book ?? "required"}
        />
      ) : (
        <p className="rounded-lg border border-line bg-white px-3.5 py-3 text-sm">
          {course.code} hasn’t posted its book for {CURRENT_TERM} yet, so we’ll
          match you with any {course.code} book.
          <input type="hidden" name="book" value="any" />
        </p>
      )}

      <ChoiceGroup
        legend="Lowest condition you’ll accept"
        name="minCondition"
        side="buying"
        options={MIN_CONDITION_OPTIONS}
        defaultValue={request?.minCondition ?? "any"}
      />

      <label htmlFor={noteId} className={fieldLabel}>
        Note for sellers (optional)
      </label>
      <input
        id={noteId}
        type="text"
        name="note"
        defaultValue={request?.note}
        placeholder="e.g. need it by Friday for lab"
        className={`-mt-1.5 ${fieldInput}`}
      />
    </>
  );
}

// Reads the fields above out of a submitted form.
export function readRequestFields(form) {
  const data = new FormData(form);
  return {
    book: String(data.get("book") ?? "any"),
    minCondition: String(data.get("minCondition") ?? "any"),
    note: String(data.get("note") ?? "").trim(),
  };
}
