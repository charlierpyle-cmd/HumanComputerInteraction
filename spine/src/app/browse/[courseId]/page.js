import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import ScreenHeader from "@/components/ScreenHeader";
import ShelfBook from "@/components/ShelfBook";
import { courses, getCourse } from "@/lib/courses";
import {
  formatPrice,
  getFitProblems,
  getListingsForCourse,
  isFree,
} from "@/lib/listings";
import { primaryButton, secondaryButton, textLink } from "@/lib/styles";
import { getWaitlist } from "@/lib/waitlists";

export function generateStaticParams() {
  return courses.map(({ id }) => ({ courseId: id }));
}

export default async function ListingResultsPage({ params }) {
  const course = getCourse((await params).courseId);
  if (!course) notFound();
  const listings = getListingsForCourse(course.id);
  const waitlist = getWaitlist(course.id);

  return (
    <>
      <ScreenHeader
        title={`${course.code} copies`}
        backHref="/browse"
        side="buying"
        step="2 of 3"
      />
      <main className="flex flex-1 flex-col gap-3.5 px-5 pt-6 pb-5">
        {listings.length === 0 && (
          // Nothing to browse: point to a "Looking for" request instead of a dead end.
          <>
            <p role="status" className="text-sm text-muted">
              No copies of {course.code} are listed yet.{" "}
              {waitlist
                ? "You’re already looking for one, so we’ll tell you when a copy is listed."
                : "Post a “Looking for” request and we’ll tell you when one is."}
            </p>
            <div className="mt-auto flex flex-col gap-3">
              {!waitlist && (
                <Link href={`/post/${course.id}`} className={primaryButton.buying}>
                  Post a “Looking for” request
                </Link>
              )}
              <Link href="/browse" className={secondaryButton}>
                Pick a different course
              </Link>
            </div>
          </>
        )}
        {listings.length > 0 && (
          <p className="text-[13px] text-muted">
            These are copies people have already listed. Pick one to request it
            from its owner.
          </p>
        )}
        {listings.map((listing) => {
          const fits = getFitProblems(listing).length === 0;
          return (
            <Link key={listing.id} href={`/browse/${course.id}/${listing.id}`}>
              <ShelfBook
                book={{
                  title: listing.title,
                  condition: `${listing.condition} · ${listing.seller} · ${formatPrice(listing)}`,
                }}
                code={course.code}
                trailing={<Icon name="chevron" className="size-4 text-muted" />}
              >
                <span className="mt-1 flex flex-wrap gap-1">
                  <span
                    className={`w-fit rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      fits ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {fits ? "✓ Fits your section" : "! May not fit your section"}
                  </span>
                  {isFree(listing) && (
                    <span className="w-fit rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-800">
                      Free
                    </span>
                  )}
                  {listing.status === "pending" && (
                    <span className="w-fit rounded bg-gray-200 px-1.5 py-0.5 text-[10px] font-bold text-gray-700">
                      Request pending
                    </span>
                  )}
                </span>
              </ShelfBook>
            </Link>
          );
        })}
        {listings.length > 0 && !waitlist && (
          <p className="pt-2 text-center text-[13px] text-muted">
            None of these work?{" "}
            <Link href={`/post/${course.id}`} className={`${textLink} text-buying`}>
              Post a “Looking for” request
            </Link>
          </p>
        )}
      </main>
    </>
  );
}