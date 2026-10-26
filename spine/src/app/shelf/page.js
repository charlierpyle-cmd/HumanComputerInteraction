import Link from "next/link";
import MatchBadge from "@/components/MatchBadge";
import ScreenHeader from "@/components/ScreenHeader";
import ShelfBook from "@/components/ShelfBook";
import { getCourse } from "@/lib/courses";
import { getMatches, shelf } from "@/lib/shelf";

export default function ShelfPage() {
  const matches = getMatches();

  return (
    <>
      <ScreenHeader title="My Shelf" backHref="/" side="selling" step="1 of 3" />
      <main className="flex flex-col gap-3.5 px-5 pt-6 pb-5">
        {shelf.map((book) => {
          const { code } = getCourse(book.courseId);
          const match = matches.find(({ bookId }) => bookId === book.id);

          if (!match) {
            return (
              <ShelfBook key={book.id} book={book}>
                <span className="text-xs text-muted">
                  No requests yet for {code}
                </span>
              </ShelfBook>
            );
          }

          return (
            <Link key={book.id} href={`/matches/${match.id}`}>
              <ShelfBook book={book}>
                <span className="mt-1 flex items-center gap-1.5 text-xs">
                  <MatchBadge />
                  {match.buyer} wants this for {code}
                </span>
              </ShelfBook>
            </Link>
          );
        })}
      </main>
    </>
  );
}
