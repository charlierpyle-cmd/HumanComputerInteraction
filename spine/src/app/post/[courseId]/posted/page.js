import Link from "next/link";
import { notFound } from "next/navigation";
import ScreenHeader from "@/components/ScreenHeader";
import { courses, getCourse } from "@/lib/courses";

export function generateStaticParams() {
  return courses.map(({ id }) => ({ courseId: id }));
}

export default async function RequestPostedPage({ params }) {
  const course = getCourse((await params).courseId);
  if (!course) notFound();

  return (
    <>
      <ScreenHeader title="Request posted" side="buying" />
      <main className="flex flex-col items-center gap-4 px-5 pt-20 text-center">
        <span
          aria-hidden
          className="flex size-[72px] items-center justify-center rounded-full bg-gold text-[32px] font-bold text-white"
        >
          ✓
        </span>
        <h2 className="text-[22px] font-semibold">Request posted</h2>
        <p className="max-w-[280px] text-[13px] leading-4 text-muted">
          You’re on the {course.code} waitlist. We’ll match you with any seller
          who lists a copy, not just one person.
        </p>
        <p className="rounded-lg border border-line bg-card px-4 py-3 text-xs">
          {course.shortTitle ?? course.title} · {course.code} · on waitlist 7
          days
        </p>
        <Link
          href="/"
          className="w-full rounded-lg bg-gold py-[15px] text-[15px] font-semibold text-white"
        >
          Back to Home
        </Link>
      </main>
    </>
  );
}
