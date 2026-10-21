import { notFound } from "next/navigation";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import { getListing } from "@/lib/listings";

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
        <button
          type="button"
          className="w-full rounded-lg border border-line bg-card py-[15px] text-[15px] font-semibold"
        >
          Message seller
        </button>
      }
    >
      This copy is held for you for 7 days. Message {seller} to arrange pickup.
    </ConfirmationScreen>
  );
}