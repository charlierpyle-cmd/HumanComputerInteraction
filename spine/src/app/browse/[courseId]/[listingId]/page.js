import { notFound } from "next/navigation";
import ScreenHeader from "@/components/ScreenHeader";
import {
  formatPrice,
  getFitChecks,
  getFitProblems,
  getListing,
  getListingParams,
} from "@/lib/listings";
import { card } from "@/lib/styles";
import ClaimButton from "./ClaimButton";

export const instant = false;

export function generateStaticParams() {
  return getListingParams();
}

const checkStyles = {
  ok: { mark: "✓", className: "text-green-800" },
  problem: { mark: "✗", className: "text-danger" },
  info: { mark: "–", className: "text-muted" },
};

export default async function ListingDetailPage({ params }) {
  const { courseId, listingId } = await params;
  const listing = getListing(courseId, listingId);
  if (!listing) notFound();

  const { code } = listing.course;
  const problems = getFitProblems(listing);

  return (
    <>
      <ScreenHeader
        title="Listing detail"
        backHref={`/browse/${courseId}`}
        side="buying"
        step="3 of 3"
      />
      <main className="flex flex-1 flex-col gap-4 px-5 pt-5 pb-5">
        <div className={`flex flex-col gap-1 px-4 py-3.5 ${card}`}>
          <h2 className="text-lg font-semibold">{listing.title}</h2>
          <p className="text-2xl font-bold">{formatPrice(listing)}</p>
          <p className="text-sm">
            {listing.condition}
            {listing.conditionNote && `, ${listing.conditionNote}`}
          </p>
          <p className="text-sm text-muted">
            Posted by {listing.seller}
            {listing.sellerResponse && ` · ${listing.sellerResponse.toLowerCase()}`}
          </p>
        </div>

        <div
          className={`rounded-lg border px-4 py-3 text-[15px] font-semibold ${
            problems.length
              ? "border-amber-300 bg-amber-50 text-amber-900"
              : "border-green-300 bg-green-50 text-green-900"
          }`}
        >
          {problems.length
            ? `May not work for ${code}: ${problems.length} problem${problems.length > 1 ? "s" : ""} below`
            : `Works for ${code}`}
        </div>

        <ul className="flex flex-col gap-2 text-sm">
          {getFitChecks(listing).map(({ status, text }) => (
            <li key={text} className="flex gap-2">
              <span aria-hidden className={`w-3 font-bold ${checkStyles[status].className}`}>
                {checkStyles[status].mark}
              </span>
              {text}
            </li>
          ))}
        </ul>

        <ClaimButton
          claimHref={`/browse/${courseId}/${listing.id}/claimed`}
          backHref={`/browse/${courseId}`}
          problems={problems}
        />
      </main>
    </>
  );
}
