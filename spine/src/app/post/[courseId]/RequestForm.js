"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { addRequest, useRequests } from "@/lib/myRequests";
import { primaryButton, secondaryButton } from "@/lib/styles";

export default function RequestForm({ courseId, code, courseTitle, seed }) {
  const router = useRouter();
  const requests = useRequests(seed);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addRequest(seed, {
      courseId,
      code,
      courseTitle,
      bookTitle: String(data.get("bookTitle") ?? "").trim(),
      anyEdition: data.get("anyEdition") === "on",
      note: String(data.get("note") ?? "").trim(),
      joinedDaysAgo: 0,
      daysLeft: 7,
    });
    router.push(`/post/${courseId}/posted`);
  }

  // Still reading the browser's storage.
  if (!requests) return null;

  const existing = requests.find((r) => r.courseId === courseId);

  if (existing) {
    // Already looking for this course: posting again would only duplicate it.
    return (
      <>
        <div
          role="status"
          className="flex flex-col gap-1 rounded-lg border border-buying/40 bg-buying/10 px-4 py-3.5"
        >
          <span className="text-sm font-semibold">
            You’re already looking for a {code} book
          </span>
          <span className="text-xs text-muted">
            Your request lasts {existing.daysLeft} more days. We’ll tell you when
            a copy is listed. You can change or delete it any time.
          </span>
        </div>
        <div className="mt-auto flex flex-col gap-3">
          <Link href="/my-requests" className={primaryButton.buying}>
            Manage my requests
          </Link>
          <Link href={`/browse/${courseId}`} className={secondaryButton}>
            Browse {code} copies
          </Link>
          <Link href="/post" className={secondaryButton}>
            Pick a different course
          </Link>
        </div>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3.5">
      <label htmlFor="bookTitle" className="text-xs font-semibold text-muted">
        Specific book (optional)
      </label>
      <input
        id="bookTitle"
        type="text"
        name="bookTitle"
        placeholder="Leave blank for any book for this course"
        className="rounded-lg border border-line bg-white px-3.5 py-3 text-[13px] placeholder:text-muted"
      />
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
        Your request lasts 7 days. You can edit or delete it at any time.
      </p>
      <button type="submit" className={`mt-auto ${primaryButton.buying}`}>
        Post my request
      </button>
    </form>
  );
}