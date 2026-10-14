"use client";

import { useRouter } from "next/navigation";

export default function RequestForm({ courseId }) {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    // No backend yet: posting just advances to the confirmation screen.
    router.push(`/post/${courseId}/posted`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3.5">
      <label className="flex cursor-pointer items-center justify-between py-1 text-sm">
        Any edition is fine
        <input
          type="checkbox"
          role="switch"
          name="anyEdition"
          defaultChecked
          className="peer sr-only"
        />
        <span
          aria-hidden
          className="relative h-[22px] w-10 rounded-full bg-ink/20 transition-colors peer-checked:bg-gold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold after:absolute after:top-[3px] after:left-[3px] after:size-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-[18px]"
        />
      </label>
      <input
        type="text"
        name="note"
        placeholder="e.g. need it by Friday for lab"
        aria-label="Note for sellers (optional)"
        className="rounded-lg border border-line bg-white px-3.5 py-3 text-[13px] placeholder:text-muted"
      />
      <button
        type="submit"
        className="mt-auto rounded-lg bg-gold py-3.5 text-[15px] font-semibold text-white"
      >
        POST REQUEST
      </button>
    </form>
  );
}
