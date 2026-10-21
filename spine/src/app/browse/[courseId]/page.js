import Link from "next/link";
import ScreenHeader from "@/components/ScreenHeader";
import ShelfBook from "@/components/ShelfBook";
import { getListingsForCourse } from "@/lib/listings";

export default async function ListingResultsPage({ params }) {
  const { courseId } = await params;
  const listings = getListingsForCourse(courseId);

  return (
    <>
      <ScreenHeader title="Listing results" backHref="/browse" side="buying" />
      <main className="flex flex-col gap-3.5 px-5 pt-6 pb-5">
        {listings.length === 0 && (
          <p className="text-sm text-muted">No copies listed yet.</p>
        )}
        {listings.map((listing) => (
          <Link
            key={listing.id}
            href={`/browse/${courseId}/${listing.id}`}
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