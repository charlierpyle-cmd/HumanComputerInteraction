import Link from "next/link";
import { notFound } from "next/navigation";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import { courses, getCourse } from "@/lib/courses";
import RequestRecap from "./RequestRecap";

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
      recap={<RequestRecap courseId={course.id} summary={`${course.code} · active for 7 days`} />}
      undo={{
        label: "Delete request",
        confirm: `Delete your ${course.code} request? Sellers won’t be matched with you anymore.`,
        doneTitle: "Request deleted",
        doneText: `You’re no longer looking for a ${course.code} book, so sellers won’t be matched with you.`,
        retryHref: `/post/${course.id}`,
        retryLabel: "Post it again",
        removeRequest: course.id,
      }}
    >
      We’ll tell you when any student lists a {course.code} book, and you can{" "}
      <Link href="/my-requests" className="font-semibold text-ink underline underline-offset-2">
        edit or delete your request
      </Link>{" "}
      any time.
    </ConfirmationScreen>
  );
}
