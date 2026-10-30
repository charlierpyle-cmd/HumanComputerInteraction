"use client";

import CourseSearch from "@/components/CourseSearch";
import ScreenHeader from "@/components/ScreenHeader";
import { useRequests } from "@/lib/myRequests";

export default function PostPage() {
  const requests = useRequests();
  const notes = Object.fromEntries(
    requests.map(({ courseId }) => [courseId, "You’re already looking"]),
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
