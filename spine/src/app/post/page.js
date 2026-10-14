import ScreenHeader from "@/components/ScreenHeader";
import CourseSearch from "./CourseSearch";

export default function PostPage() {
  return (
    <>
      <ScreenHeader title="Search course" backHref="/" side="buying" />
      <CourseSearch />
    </>
  );
}
