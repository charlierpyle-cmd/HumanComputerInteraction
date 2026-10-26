import CourseSearch from "@/components/CourseSearch";
import ScreenHeader from "@/components/ScreenHeader";
import { courses } from "@/lib/courses";
import { getListingsForCourse } from "@/lib/listings";

export default function BrowsePage() {
  // Only courses with copies get a note, so they stand out from the rest.
  const notes = Object.fromEntries(
    courses.flatMap(({ id }) => {
      const count = getListingsForCourse(id).length;
      return count ? [[id, count === 1 ? "1 copy" : `${count} copies`]] : [];
    }),
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
