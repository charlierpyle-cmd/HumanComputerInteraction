import ScreenHeader from "@/components/ScreenHeader";
import CourseSearch from "@/app/post/CourseSearch";

export default function BrowsePage() {
  return (
    <>
      <ScreenHeader title="Search course" backHref="/" side="buying" />
      <CourseSearch basePath="/browse" />
    </>
  );
}