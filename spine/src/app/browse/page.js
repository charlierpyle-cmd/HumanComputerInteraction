"use client";

import CourseSearch from "@/components/CourseSearch";
import ScreenHeader from "@/components/ScreenHeader";
import { useListings } from "@/lib/myListings";

export default function BrowsePage() {
  const listings = useListings();
  // Only courses with copies get a note, so they stand out from the rest.
  const counts = {};
  for (const { courseId } of listings) counts[courseId] = (counts[courseId] ?? 0) + 1;
  const notes = Object.fromEntries(
    Object.entries(counts).map(([id, count]) => [id, count === 1 ? "1 copy" : `${count} copies`]),
  );

  return (
    <>
      <ScreenHeader title="Browse copies" backHref="/" side="buying" step="1 of 3" />
      <CourseSearch
        basePath="/browse"
        intro="Pick your course to see copies other students are selling."
        notes={notes}
      />
    </>
  );
}
