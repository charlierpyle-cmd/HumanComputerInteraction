import { notFound } from "next/navigation";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import { formatPrice, getListing, getListingParams } from "@/lib/listings";

export const instant = false;

export function generateStaticParams() {
  return getListingParams();
}

export default async function CopyClaimedPage({ params }) {
  const { courseId, listingId } = await params;
  const listing = getListing(courseId, listingId);
  if (!listing) notFound();

  const { course, seller } = listing;

  return (
    <ConfirmationScreen
      title="Copy claimed"
      side="buying"
      recap={`${listing.title} · ${course.code} · ${formatPrice(listing)} · held 7 days`}
      undo={{
        label: "Release this copy",
        confirm: `Release this copy? ${seller}’s copy will be open to other students again.`,
        doneTitle: "Copy released",
        doneText: `${seller}’s copy is open to other students again.`,
        retryHref: `/browse/${course.id}`,
        retryLabel: "Back to listings",
      }}
    >
      This copy is held for you for 7 days. We’ve told {seller}, who will
      message you to arrange pickup.
    </ConfirmationScreen>
  );
}
