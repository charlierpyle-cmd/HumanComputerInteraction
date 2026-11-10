import { notFound } from "next/navigation";
import ScreenHeader from "@/components/ScreenHeader";
import { CURRENT_TERM, courses, getCourse } from "@/lib/courses";
import CopyList from "./CopyList";

export const instant = false;

export function generateStaticParams() {
  return courses.map(({ id }) => ({ courseId: id }));
}

export default async function ListingResultsPage({ params, searchParams }) {
  const { courseId } = await params;
  const sParams = await searchParams;
  const course = getCourse(courseId);
  if (!course) notFound();

  return (
    <>
      <ScreenHeader
        title={`${course.code} copies`}
        backHref={sParams?.from === "notifications" ? "/notifications" : "/browse"}
        side="buying"
        step="2 of 3"
      />
      <main className="flex flex-1 flex-col gap-3 px-5 pt-5 pb-5">
        {/* Which book the class needs, so every copy below can be checked
        against it at a glance. */}
        <div className="flex flex-col gap-0.5 rounded-lg border border-buying/40 bg-buying/10 px-4 py-3">
          <span className="text-[13px] text-muted">
            {course.code} · {course.title} · {CURRENT_TERM}
          </span>
          <span className="text-[15px]">
            {course.requiredBook ? (
              <>
                Required book:{" "}
                <span className="font-semibold">{course.requiredBook.title}</span>
              </>
            ) : (
              "The required book hasn’t been posted yet."
            )}
          </span>
        </div>
        <CopyList courseId={course.id} code={course.code} />
      </main>
    </>
  );
}
