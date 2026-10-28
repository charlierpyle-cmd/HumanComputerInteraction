import Link from "next/link";
import { notFound } from "next/navigation";
import ScreenHeader from "@/components/ScreenHeader";
import { CURRENT_TERM, courses, getCourse } from "@/lib/courses";
import { primaryButton, secondaryButton } from "@/lib/styles";
import { getWaitlist } from "@/lib/waitlists";
import RequestForm from "./RequestForm";

export function generateStaticParams() {
  return courses.map(({ id }) => ({ courseId: id }));
}

export default async function ConfirmRequestPage({ params }) {
  const course = getCourse((await params).courseId);
  if (!course) notFound();
  const waitlist = getWaitlist(course.id);

  return (
    <>
      <ScreenHeader title="Confirm request" backHref="/post" side="buying" step="2 of 2" />
      <main className="flex flex-1 flex-col gap-3.5 px-5 pt-6 pb-5">
        <div className="flex flex-col gap-0.5 rounded-lg border border-line bg-card px-4 py-3.5">
          <span className="text-sm font-semibold">
            {course.code} · {course.title}
          </span>
          <span className="text-xs text-muted">{CURRENT_TERM}</span>
        </div>
        {waitlist ? (
          // Already waiting on this course: posting again would only duplicate it.
          <>
            <div
              role="status"
              className="flex flex-col gap-1 rounded-lg border border-buying/40 bg-buying/10 px-4 py-3.5"
            >
              <span className="text-sm font-semibold">
                You’re already on the {course.code} waitlist
              </span>
              <span className="text-xs text-muted">
                You joined {waitlist.joinedDaysAgo} days ago and your spot lasts{" "}
                {waitlist.daysLeft} more days. We’ll tell you when a copy is
                listed.
              </span>
            </div>
            <div className="mt-auto flex flex-col gap-3">
              <Link href={`/browse/${course.id}`} className={primaryButton.buying}>
                Browse {course.code} copies
              </Link>
              <Link href="/post" className={secondaryButton}>
                Pick a different course
              </Link>
            </div>
          </>
        ) : (
          <RequestForm courseId={course.id} />
        )}
      </main>
    </>
  );
}
