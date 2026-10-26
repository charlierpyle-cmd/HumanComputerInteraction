import { notFound } from "next/navigation";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import { getListing, getListings } from "@/lib/listings";
import { secondaryButton } from "@/lib/styles";

export function generateStaticParams() {
  return getListings().map(({ id, courseId }) => ({ courseId, listingId: id }));
}

export default async function CopyClaimedPage({ params }) {
  const listing = getListing((await params).listingId);
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
