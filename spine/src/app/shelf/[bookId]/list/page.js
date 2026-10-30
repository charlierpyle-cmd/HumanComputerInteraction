import { notFound } from "next/navigation";
import ScreenHeader from "@/components/ScreenHeader";
import ShelfBook from "@/components/ShelfBook";
import { getCourse } from "@/lib/courses";
import { getBook, shelf } from "@/lib/shelf";
import ListForm from "./ListForm";

export const instant = false;

export function generateStaticParams() {
  return shelf.map(({ id }) => ({ bookId: id }));
}

export default async function ListBookPage({ params }) {
  const book = getBook((await params).bookId);
  if (!book) notFound();
  const { code } = getCourse(book.courseId);

  return (
    <>
      <ScreenHeader title="List on Browse" backHref="/shelf" side="selling" />
      <main className="flex flex-1 flex-col gap-3.5 px-5 pt-6 pb-5">
        <h2 className="text-xs font-semibold text-muted">From your shelf</h2>
        <ShelfBook book={book} code={code} />
        <ListForm book={book} code={code} />
      </main>
    </>
  );
}
