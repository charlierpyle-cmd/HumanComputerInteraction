"use client";

import { useMemo } from "react";
import { courses, getCourse } from "./courses";
import { getListingsForCourse } from "./listings";
import { createTable, useTable } from "./localTable";
import { CURRENT_USER } from "./matches";

// Books from the student's shelf they've listed on Browse themselves, without
// waiting for a buyer to request one. Prototype only: they live in this visit's
// local table, so a reload takes them down again.
const myListings = createTable([]);

export function useMyListings() {
  return useTable(myListings);
}

// Puts a shelf book on Browse. Listing it again replaces the old listing.
export function listBook(book, { condition, price }) {
  const rest = myListings.get().filter((l) => l.bookId !== book.id);
  myListings.set([
    ...rest,
    {
      id: `${book.id}-${CURRENT_USER}`,
      bookId: book.id,
      courseId: book.courseId,
      course: getCourse(book.courseId),
      title: book.title,
      condition,
      seller: "You",
      ownerId: CURRENT_USER,
      price,
      type: "sell",
      status: "available",
    },
  ]);
}

export function unlistBook(bookId) {
  myListings.set(myListings.get().filter((l) => l.bookId !== bookId));
}

// Every copy on Browse, live: what other students listed, then the student's own.
export function useListings() {
  const mine = useMyListings();
  return useMemo(
    () => [...courses.flatMap(({ id }) => getListingsForCourse(id)), ...mine],
    [mine],
  );
}

export function isMine(listing) {
  return listing.ownerId === CURRENT_USER;
}
