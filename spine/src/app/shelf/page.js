import Link from "next/link";
import Icon from "@/components/Icon";
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
        <p className="text-sm text-muted">
          Books you’re done with. When a student on a course waitlist needs one,
          it’s flagged here.
        </p>
        {shelf.map((book) => {
          const { code } = getCourse(book.courseId);
          const match = matches.find(({ bookId }) => bookId === book.id);

          if (!match) {
            return (
              <ShelfBook key={book.id} book={book} code={code}>
                <span className="text-xs text-muted">
                  No requests yet. We’ll tell you when someone joins the {code}{" "}
                  waitlist.
                </span>
              </ShelfBook>
            );
          }

          return (
            <Link key={book.id} href={`/matches/${match.id}`}>
              <ShelfBook
                book={book}
                code={code}
                highlight
                trailing={
                  <span className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-selling">
                    Review
                    <Icon name="chevron" className="size-4" />
                  </span>
                }
              >
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
