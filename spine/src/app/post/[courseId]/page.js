import { notFound } from "next/navigation";
import ScreenHeader from "@/components/ScreenHeader";
import { CURRENT_TERM, courses, getCourse } from "@/lib/courses";
import RequestForm from "./RequestForm";

export const instant = false;

export function generateStaticParams() {
  return courses.map(({ id }) => ({ courseId: id }));
}

export default async function ConfirmRequestPage({ params }) {
  const course = getCourse((await params).courseId);
  if (!course) notFound();

  return (
    <>
      <ScreenHeader
        title="Post your request"
        backHref="/post"
        side="buying"
        step="2 of 2"
      />
      <main className="flex flex-1 flex-col gap-3.5 px-5 pt-6 pb-5">
        <div className="flex flex-col gap-0.5 rounded-lg border border-line bg-card px-4 py-3.5">
          <span className="text-sm font-semibold">
            {course.code} · {course.title}
          </span>
          <span className="text-xs text-muted">{CURRENT_TERM}</span>
        </div>
        <RequestForm
          courseId={course.id}
          code={course.code}
          courseTitle={course.title}
        />
      </main>
    </>
  );
}