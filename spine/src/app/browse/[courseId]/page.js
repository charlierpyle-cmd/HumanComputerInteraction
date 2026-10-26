import Link from "next/link";
import { notFound } from "next/navigation";
import ScreenHeader from "@/components/ScreenHeader";
import ShelfBook from "@/components/ShelfBook";
import { courses, getCourse } from "@/lib/courses";
import { getListingsForCourse } from "@/lib/listings";

export function generateStaticParams() {
  return courses.map(({ id }) => ({ courseId: id }));
}

export default async function ListingResultsPage({ params }) {
  const course = getCourse((await params).courseId);
  if (!course) notFound();
  const listings = getListingsForCourse(course.id);

  return (
    <>
      <ScreenHeader
        title={`${course.code} copies`}
        backHref="/browse"
        side="buying"
        step="2 of 3"
      />
      <main className="flex flex-col gap-3.5 px-5 pt-6 pb-5">
        {listings.length === 0 && (
          <p className="text-sm text-muted">No copies listed yet.</p>
        )}
        {listings.map((listing) => (
          <Link
            key={listing.id}
            href={`/browse/${course.id}/${listing.id}`}
            className="block"
          >
            <ShelfBook
              book={{
                title: listing.title,
                condition: `${listing.condition} · ${listing.seller} · $${listing.price}`,
              }}
            >
              <span
                className={`mt-1 w-fit rounded px-1.5 py-0.5 text-[9px] font-bold ${
                  listing.requiresCode
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {listing.requiresCode ? "REQUIRES CODE" : "NO CODE NEEDED"}
              </span>
            </ShelfBook>
          </Link>
        ))}
      </main>
    </>
  );
}
