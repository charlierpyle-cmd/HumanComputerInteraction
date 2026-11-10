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
      <main className="flex flex-1 flex-col gap-4 px-5 pt-5 pb-5">
        <ShelfBook book={{ title: book.title }} courseId={book.courseId} />
        <ListForm book={book} code={code} />
      </main>
    </>
  );
}
