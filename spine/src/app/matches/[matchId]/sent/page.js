import { notFound } from "next/navigation";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import { getMatch, getMatches } from "@/lib/shelf";
import OfferRecap from "./OfferRecap";

export const instant = false;

export function generateStaticParams() {
  return getMatches().map(({ id }) => ({ matchId: id }));
}

export default async function OfferSentPage({ params }) {
  const match = getMatch((await params).matchId);
  if (!match) notFound();
  const { book, course } = match;

  return (
    <ConfirmationScreen
      title="Offer sent"
      side="selling"
      recap={
        <OfferRecap
          matchId={match.id}
          buyer={match.buyer}
          summary={`${book.title} · ${course.code} · held 7 days`}
        />
      }
      undo={{
        label: "Withdraw offer",
        confirm: `Withdraw your offer? ${match.buyer} won’t see it anymore.`,
        doneTitle: "Offer withdrawn",
        doneText: `${match.buyer} won’t see your offer. Your copy stays in My Books.`,
        retryHref: `/matches/${match.id}`,
        retryLabel: "Back to match",
        withdrawOffer: match.id,
      }}
    >
      {match.buyer} has about a week to accept. We’ll notify you either way.
    </ConfirmationScreen>
  );
}
