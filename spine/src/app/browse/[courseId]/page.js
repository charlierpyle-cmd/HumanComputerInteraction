import { notFound } from "next/navigation";
import ScreenHeader from "@/components/ScreenHeader";
import { courses, getCourse } from "@/lib/courses";
import CopyList from "./CopyList";

export function generateStaticParams() {
  return courses.map(({ id }) => ({ courseId: id }));
}

export default async function ListingResultsPage({ params }) {
  const course = getCourse((await params).courseId);
  if (!course) notFound();

  return (
    <>
      <ScreenHeader
        title={`${course.code} copies`}
        backHref="/browse"
        side="buying"
        step="2 of 3"
      />
      <main className="flex flex-1 flex-col gap-3.5 px-5 pt-6 pb-5">
        <CopyList courseId={course.id} code={course.code} />
      </main>
    </>
  );
}
