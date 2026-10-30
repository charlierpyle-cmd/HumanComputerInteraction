import { notFound } from "next/navigation";
import ScreenHeader from "@/components/ScreenHeader";
import { getMatch, getMatches } from "@/lib/shelf";
import MatchGate from "./MatchGate";
import OfferForm from "./OfferForm";

export const instant = false;

export function generateStaticParams() {
  return getMatches().map(({ id }) => ({ matchId: id }));
}

export default async function MakeOfferPage({ params }) {
  const match = getMatch((await params).matchId);
  if (!match) notFound();
  const { course } = match;

  return (
    <>
      <ScreenHeader
        title="Make an offer"
        backHref={`/matches/${match.id}`}
        side="selling"
        step="3 of 3"
      />
      <main className="flex flex-1 flex-col gap-3.5 px-5 pt-6 pb-5">
        <div className="flex flex-col gap-0.5 rounded-lg border border-line bg-card px-4 py-3.5">
          <span className="text-sm font-semibold">
            {course.shortTitle ?? course.title}, for {match.buyer}
          </span>
          <span className="text-xs text-muted">{course.code}</span>
        </div>
        <MatchGate matchId={match.id}>
          <OfferForm
            matchId={match.id}
            buyer={match.buyer}
            condition={match.book.condition}
            suggestedPrice={match.suggestedPrice}
            typicalRange={match.typicalRange}
          />
        </MatchGate>
      </main>
    </>
  );
}