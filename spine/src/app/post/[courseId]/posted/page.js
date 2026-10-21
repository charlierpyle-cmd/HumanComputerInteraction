import { notFound } from "next/navigation";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import { courses, getCourse } from "@/lib/courses";

export function generateStaticParams() {
  return courses.map(({ id }) => ({ courseId: id }));
}

export default async function RequestPostedPage({ params }) {
  const course = getCourse((await params).courseId);
  if (!course) notFound();

  return (
    <ConfirmationScreen
      title="Request posted"
      side="buying"
      recap={`${course.shortTitle ?? course.title} · ${course.code} · on waitlist 7 days`}
    >
      You’re on the {course.code} waitlist. We’ll match you with any seller who
      lists a copy, not just one person.
    </ConfirmationScreen>
  );
}
