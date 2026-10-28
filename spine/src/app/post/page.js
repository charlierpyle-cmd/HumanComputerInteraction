import CourseSearch from "@/components/CourseSearch";
import ScreenHeader from "@/components/ScreenHeader";
import { getWaitlists } from "@/lib/waitlists";

export default function PostPage() {
  const notes = Object.fromEntries(
    getWaitlists().map(({ courseId }) => [courseId, "On your waitlist"]),
  );

  return (
    <>
      <ScreenHeader title="Request a book" backHref="/" side="buying" step="1 of 2" />
      <CourseSearch
        basePath="/post"
        intro="Pick your course. We'll add you to its waitlist and tell you when someone lists a copy."
        notes={notes}
      />
    </>
  );
}
