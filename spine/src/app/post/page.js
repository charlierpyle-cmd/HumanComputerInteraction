import CourseSearch from "@/components/CourseSearch";
import ScreenHeader from "@/components/ScreenHeader";
import { getWaitlists } from "@/lib/waitlists";

export default function PostPage() {
  const notes = Object.fromEntries(
    getWaitlists().map(({ courseId }) => [courseId, "You’re already looking"]),
  );

  return (
    <>
      <ScreenHeader
        title="Post a “Looking for” request"
        backHref="/"
        side="buying"
        step="1 of 2"
      />
      <CourseSearch
        basePath="/post"
        intro="Can’t find a copy? Pick any course, from any class, and we’ll tell you when someone lists one."
        notes={notes}
      />
    </>
  );
}