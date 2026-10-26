import { notFound } from "next/navigation";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import { getListing, getListingParams } from "@/lib/listings";

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
      recap={`${course.shortTitle ?? course.title} · ${course.code} · held 7 days`}
    >
      This copy is held for you for 7 days. We’ve told {seller}, who will
      message you to arrange pickup.
    </ConfirmationScreen>
  );
}
