import { notFound } from "next/navigation";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import { getMatch, getMatches } from "@/lib/shelf";

export function generateStaticParams() {
  return getMatches().map(({ id }) => ({ matchId: id }));
}

export default async function OfferSentPage({ params }) {
  const match = getMatch((await params).matchId);
  if (!match) notFound();
  const { course } = match;

  return (
    <ConfirmationScreen
      title="Offer sent"
      side="selling"
      recap={`${course.shortTitle ?? course.title} · ${course.code} · held 7 days`}
    >
      {match.buyer} has about a week to accept. We’ll notify you either way.
    </ConfirmationScreen>
  );
}
