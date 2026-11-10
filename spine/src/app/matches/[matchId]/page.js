import { notFound } from "next/navigation";
import ScreenHeader from "@/components/ScreenHeader";
import ShelfBook from "@/components/ShelfBook";
import { CURRENT_TERM } from "@/lib/courses";
import { getMatch, getMatches } from "@/lib/shelf";
import { card } from "@/lib/styles";
import MatchActions from "./MatchActions";

export const instant = false;

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
      <main className="flex flex-1 flex-col gap-3 px-5 pt-5 pb-5">
        <div className={`flex flex-col gap-0.5 px-4 py-3.5 ${card}`}>
          <span className="text-base font-semibold">
            {match.buyer} needs a {match.course.code} book
          </span>
          <span className="text-sm text-muted">
            {match.course.title} · {CURRENT_TERM}
          </span>
          <span className="text-sm text-muted">{match.buyerResponse}</span>
        </div>
        <h2 className="mt-2 text-sm font-semibold">Your copy</h2>
        <ShelfBook book={match.book} courseId={match.book.courseId} />
        <div className="mt-auto flex flex-col gap-3 pt-3">
          <MatchActions matchId={match.id} />
        </div>
      </main>
    </>
  );
}
