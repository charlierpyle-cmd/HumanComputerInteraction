import { notFound } from "next/navigation";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import { getListing, getListingParams } from "@/lib/listings";
import { secondaryButton } from "@/lib/styles";

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
      actions={
        <button type="button" className={secondaryButton}>
          Message seller
        </button>
      }
    >
      This copy is held for you for 7 days. Message {seller} to arrange pickup.
    </ConfirmationScreen>
  );
}
