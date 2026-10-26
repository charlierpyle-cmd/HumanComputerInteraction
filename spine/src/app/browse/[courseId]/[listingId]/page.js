import Link from "next/link";
import { notFound } from "next/navigation";
import ScreenHeader from "@/components/ScreenHeader";
import { getListing, getListings } from "@/lib/listings";
import { primaryButton } from "@/lib/styles";

export function generateStaticParams() {
  return getListings().map(({ id, courseId }) => ({ courseId, listingId: id }));
}

export default async function ListingDetailPage({ params }) {
  const { courseId, listingId } = await params;
  const listing = getListing(listingId);
  if (!listing || listing.courseId !== courseId) notFound();

  const checks = [
    { ok: listing.acceptedEdition, text: "Edition accepted for this course" },
    { ok: !listing.requiresCode, text: "No access code required for this section" },
    { ok: listing.studyGuideIncluded, text: "Study guide supplement not included", neutral: !listing.studyGuideIncluded },
  ];

  return (
    <>
      <ScreenHeader
        title="Listing detail"
        backHref={`/browse/${courseId}`}
        side="buying"
        step="3 of 3"
      />
      <main className="flex flex-1 flex-col gap-4 px-5 pt-6 pb-5">
        <div className="rounded-lg border border-line bg-card px-4 py-3.5">
          <h2 className="text-sm font-semibold">{listing.title}</h2>
          <p className="text-xs text-muted">
            {listing.condition}
            {listing.conditionNote && ` — ${listing.conditionNote}`} · ${listing.price}
          </p>
          <p className="text-xs text-muted">
            Posted by {listing.seller}
            {listing.sellerResponse && ` · ${listing.sellerResponse.toLowerCase()}`}
          </p>
        </div>

        <h3 className="text-sm font-semibold">
          Does this work for {listing.course.code}?
        </h3>
        <ul className="flex flex-col gap-1.5 text-xs">
          {checks.map(({ ok, text, neutral }) => (
            <li key={text} className="flex gap-2">
              <span aria-hidden>{neutral ? "–" : ok ? "✓" : "✗"}</span>
              {text}
            </li>
          ))}
        </ul>

        <Link
          href={`/browse/${courseId}/${listing.id}/claimed`}
          className={`mt-auto ${primaryButton.buying}`}
        >
          Claim this copy
        </Link>
      </main>
    </>
  );
}
