import Link from "next/link";
import { notFound } from "next/navigation";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import { courses, getCourse } from "@/lib/courses";

export const instant = false;

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
      recap={`${course.shortTitle ?? course.title} · ${course.code} · “Looking for” request active 7 days`}
      undo={{
        label: "Delete request",
        doneTitle: "Request deleted",
        doneText: `You’re no longer looking for a ${course.code} book, so sellers won’t be matched with you.`,
        retryHref: `/post/${course.id}`,
        retryLabel: "Post it again",
      }}
    >
      You’re now looking for a {course.code} book. We’ll match you with any
      seller who lists a copy, not just one person, and you can{" "}
      <Link href="/my-requests" className="font-semibold underline">
        edit or delete your request
      </Link>{" "}
      any time.
    </ConfirmationScreen>
  );
}