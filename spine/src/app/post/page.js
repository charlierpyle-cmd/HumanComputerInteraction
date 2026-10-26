import ScreenHeader from "@/components/ScreenHeader";
import CourseSearch from "./CourseSearch";

export default function PostPage() {
  return (
    <>
      <ScreenHeader title="Request a book" backHref="/" side="buying" step="1 of 2" />
      <CourseSearch
        basePath="/post"
        intro="Pick your course. We'll add you to its waitlist and tell you when someone lists a copy."
      />
    </>
  );
}
