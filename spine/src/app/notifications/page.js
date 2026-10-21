import Link from "next/link";
import MatchBadge from "@/components/MatchBadge";
import ScreenHeader from "@/components/ScreenHeader";
import { getMatches } from "@/lib/shelf";

export default function NotificationsPage() {
  return (
    <>
      <ScreenHeader title="Notifications" backHref="/" side="selling" />
      <main className="flex flex-col gap-3.5 px-5 pt-6 pb-5">
        {getMatches().map(({ id, buyer, course }) => (
          <Link
            key={id}
            href={`/matches/${id}`}
            className="flex flex-col items-start gap-1.5 rounded-lg border border-line bg-card px-4 py-[15px]"
          >
            <MatchBadge />
            <span className="text-[13px] leading-[17px]">
              {course.code} · {course.title} — matched from the class waitlist.{" "}
              {buyer} might take your copy.
            </span>
          </Link>
        ))}
        {/* Filler so the feed isn't only matches; not wired up. */}
        <p className="rounded-lg border border-line px-4 py-[15px] text-[13px] text-muted opacity-60">
          Your ‘to read’ pile — 2 items untouched
        </p>
      </main>
    </>
  );
}
