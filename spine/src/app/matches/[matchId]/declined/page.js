import { notFound } from "next/navigation";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import { getMatch, getMatches } from "@/lib/shelf";

export function generateStaticParams() {
  return getMatches().map(({ id }) => ({ matchId: id }));
}

export default async function MatchDeclinedPage({ params }) {
  const match = getMatch((await params).matchId);
  if (!match) notFound();
  const { buyer, course } = match;

  return (
    <ConfirmationScreen
      title="Request passed"
      side="selling"
      recap={`${course.shortTitle ?? course.title} · ${course.code} · still on your shelf`}
    >
      {buyer} stays on the {course.code} waitlist, so another seller can still
      help. Your copy stays on your shelf.
    </ConfirmationScreen>
  );
}
