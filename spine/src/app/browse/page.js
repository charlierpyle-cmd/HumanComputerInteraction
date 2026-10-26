import ScreenHeader from "@/components/ScreenHeader";
import CourseSearch from "@/app/post/CourseSearch";
import { courses } from "@/lib/courses";
import { getListingsForCourse } from "@/lib/listings";

export default function BrowsePage() {
  const notes = Object.fromEntries(
    courses.map(({ id }) => {
      const count = getListingsForCourse(id).length;
      return [id, count === 1 ? "1 copy" : `${count || "No"} copies`];
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
