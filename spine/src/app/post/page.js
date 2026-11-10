"use client";

import Link from "next/link";
import CourseSearch from "@/components/CourseSearch";
import ScreenHeader from "@/components/ScreenHeader";
import { useRequests } from "@/lib/myRequests";
import { textLink } from "@/lib/styles";

export default function PostPage() {
  const requests = useRequests();
  const notes = Object.fromEntries(
    requests.map(({ courseId }) => [courseId, "Already requested"]),
  );

  return (
    <>
      <ScreenHeader title="Request a book" backHref="/" side="buying" step="1 of 2" />
      <CourseSearch basePath="/post" notes={notes} />
      <p className="mt-auto px-5 pb-5 text-center text-sm text-muted">
        {requests.length === 0
          ? "You have no active requests."
          : `You have ${requests.length} active request${requests.length > 1 ? "s" : ""}.`}{" "}
        <Link href="/my-requests" className={`${textLink} text-buying`}>
          Manage my requests
        </Link>
      </p>
    </>
  );
}
