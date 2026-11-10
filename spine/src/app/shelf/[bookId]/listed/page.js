import Link from "next/link";
import { notFound } from "next/navigation";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import { getCourse } from "@/lib/courses";
import { getBook, shelf } from "@/lib/shelf";
import ListingRecap from "./ListingRecap";

export const instant = false;

export function generateStaticParams() {
  return shelf.map(({ id }) => ({ bookId: id }));
}

export default async function BookListedPage({ params }) {
  const book = getBook((await params).bookId);
  if (!book) notFound();
  const course = getCourse(book.courseId);

  return (
    <ConfirmationScreen
      title="Listed on Browse"
      side="selling"
      recap={<ListingRecap bookId={book.id} summary={`${book.title} · ${course.code}`} />}
      undo={{
        label: "Take it down",
        confirm: "Take it down? Students won’t see it on Browse anymore.",
        doneTitle: "Listing taken down",
        doneText: `Your copy is off Browse. It stays in My Books for the next ${course.code} request.`,
        retryHref: `/shelf/${book.id}/list`,
        retryLabel: "List it again",
        unlistBook: book.id,
      }}
    >
      Students in {course.code} can now{" "}
      <Link
        href={`/browse/${course.id}`}
        className="font-semibold text-ink underline underline-offset-2"
      >
        see your copy on Browse
      </Link>{" "}
      and claim it. We’ll tell you when someone does.
    </ConfirmationScreen>
  );
}
