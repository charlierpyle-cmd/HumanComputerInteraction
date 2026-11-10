"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import RequestFields, { readRequestFields } from "@/components/RequestFields";
import { getCourse } from "@/lib/courses";
import { addRequest, useRequests } from "@/lib/myRequests";
import { primaryButton, secondaryButton } from "@/lib/styles";

export default function RequestForm({ courseId }) {
  const course = getCourse(courseId);
  const router = useRouter();
  const requests = useRequests();
  // True from the tap until the next screen is up, so the button answers right
  // away. It also keeps the form showing meanwhile, instead of the "already
  // requested" notice the new request would bring up. A transition, not state,
  // so it ends on its own: Next keeps this page mounted after it's left.
  const [posting, startPosting] = useTransition();

  function handleSubmit(event) {
    event.preventDefault();
    if (posting) return;
    addRequest({
      courseId,
      code: course.code,
      courseTitle: course.title,
      ...readRequestFields(event.currentTarget),
      joinedDaysAgo: 0,
      daysLeft: 7,
    });
    startPosting(() => router.push(`/post/${courseId}/posted`));
  }

  const existing = !posting && requests.find((r) => r.courseId === courseId);

  if (existing) {
    // Already requested this course: posting again would only duplicate it.
    return (
      <>
        <div
          role="status"
          className="flex flex-col gap-1 rounded-lg border border-buying/40 bg-buying/10 px-4 py-3.5"
        >
          <span className="text-[15px] font-semibold">
            You’ve already requested a {course.code} book
          </span>
          <span className="text-sm text-muted">
            It lasts {existing.daysLeft} more days, and we’ll tell you when a copy
            is listed. You can change or delete it any time.
          </span>
        </div>
        <div className="mt-auto flex flex-col gap-3">
          <Link href="/my-requests" className={primaryButton.buying}>
            Manage my requests
          </Link>
          <Link href={`/browse/${courseId}`} className={secondaryButton}>
            Browse {course.code} copies
          </Link>
          <Link href="/post" className={secondaryButton}>
            Pick a different course
          </Link>
        </div>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4">
      <RequestFields course={course} />
      <button
        type="submit"
        disabled={posting}
        className={`mt-auto ${primaryButton.buying}`}
      >
        {posting ? "Posting…" : "Post my request"}
      </button>
    </form>
  );
}
