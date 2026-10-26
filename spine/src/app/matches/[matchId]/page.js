import Link from "next/link";
import { notFound } from "next/navigation";
import ScreenHeader from "@/components/ScreenHeader";
import ShelfBook from "@/components/ShelfBook";
import { CURRENT_TERM } from "@/lib/courses";
import { getMatch, getMatches } from "@/lib/shelf";
import { primaryButton } from "@/lib/styles";

export function generateStaticParams() {
  return getMatches().map(({ id }) => ({ matchId: id }));
}

export default async function MatchDetailPage({ params }) {
  const match = getMatch((await params).matchId);
  if (!match) notFound();

  return (
    <>
      <ScreenHeader
        title="Match detail"
        backHref="/shelf"
        side="selling"
        step="2 of 3"
      />
      <main className="flex flex-1 flex-col gap-3.5 px-5 pt-6 pb-5">
        <div className="flex flex-col gap-0.5 rounded-lg border border-line bg-card px-4 py-3.5">
          <span className="text-[15px] font-semibold">{match.course.code}</span>
          <span className="text-xs text-muted">
            Requested by {match.buyer} · {CURRENT_TERM}
          </span>
          <span className="text-xs text-muted">{match.buyerResponse}</span>
        </div>
        <h2 className="text-xs font-semibold text-muted">From your shelf</h2>
        <ShelfBook book={match.book} />
        <Link
          href={`/matches/${match.id}/offer`}
          className={`mt-auto ${primaryButton.selling}`}
        >
          Offer this copy
        </Link>
        {/* Decorative: declining isn't part of the tested path. */}
        <p className="text-center text-[13px] text-muted">Not interested</p>
      </main>
    </>
  );
}
