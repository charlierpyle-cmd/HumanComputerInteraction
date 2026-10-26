"use client";

import { useRouter } from "next/navigation";
import { primaryButton } from "@/lib/styles";

export default function RequestForm({ courseId }) {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    // No backend yet: posting just advances to the confirmation screen.
    router.push(`/post/${courseId}/posted`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3.5">
      <label className="flex cursor-pointer items-center justify-between gap-4 py-1 text-sm">
        <span className="flex flex-col gap-0.5">
          Any edition is fine
          <span id="edition-hint" className="text-xs text-muted">
            Turn off to only be matched with the edition your course lists.
          </span>
        </span>
        <input
          type="checkbox"
          role="switch"
          name="anyEdition"
          defaultChecked
          aria-describedby="edition-hint"
          className="peer sr-only"
        />
        <span
          aria-hidden
          className="relative h-[22px] w-10 shrink-0 rounded-full bg-ink/20 transition-colors peer-checked:bg-buying peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-buying after:absolute after:top-[3px] after:left-[3px] after:size-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-[18px]"
        />
      </label>
      <label htmlFor="note" className="text-xs font-semibold text-muted">
        Note for sellers (optional)
      </label>
      <input
        id="note"
        type="text"
        name="note"
        placeholder="e.g. need it by Friday for lab"
        className="rounded-lg border border-line bg-white px-3.5 py-3 text-[13px] placeholder:text-muted"
      />
      <p className="text-xs text-muted">
        Your spot on the waitlist lasts 7 days. You can leave it at any time.
      </p>
      <button type="submit" className={`mt-auto ${primaryButton.buying}`}>
        Post request
      </button>
    </form>
  );
}
