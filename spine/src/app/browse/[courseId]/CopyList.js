"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import ShelfBook from "@/components/ShelfBook";
import { fitsCourse, formatPrice } from "@/lib/listings";
import { isMine, useListings } from "@/lib/myListings";
import { sectionHeading } from "@/lib/styles";
import RequestPrompt from "./RequestPrompt";

const chevron = <Icon name="chevron" className="size-4 text-muted" />;

// One copy. Status notes are plain colored text, not pills, so nothing that
// can't be tapped looks like a button.
function Copy({ listing, courseId, code }) {
  const book = {
    title: listing.title,
    condition: `${listing.condition} · ${listing.seller} · ${formatPrice(listing)}`,
  };

  // Your own copy can't be claimed; it's managed from My Books.
  if (isMine(listing)) {
    return (
      <Link href="/shelf">
        <ShelfBook book={book} courseId={courseId} showCourse={false} interactive trailing={chevron}>
          <span className="text-[13px] font-semibold text-selling">Your listing</span>
        </ShelfBook>
      </Link>
    );
  }

  const fits = fitsCourse(listing);
  return (
    <Link href={`/browse/${courseId}/${listing.id}`}>
      <ShelfBook book={book} courseId={courseId} showCourse={false} interactive trailing={chevron}>
        <span
          className={`text-[13px] font-semibold ${fits ? "text-green-800" : "text-amber-900"}`}
        >
          {fits ? `✓ Fits ${code}` : `! May not fit ${code}`}
        </span>
        {listing.status === "pending" && (
          <span className="text-[13px] text-muted">Someone has asked for this copy</span>
        )}
      </ShelfBook>
    </Link>
  );
}

// The copies listed for a course, live, so one the student lists from My
// Books shows up here straight away. Copies of the required edition come
// first; other editions stay reachable underneath, clearly set apart.
export default function CopyList({ courseId, code }) {
  const listings = useListings().filter((l) => l.courseId === courseId);
  const fitting = listings.filter((l) => isMine(l) || fitsCourse(l));
  const others = listings.filter((l) => !isMine(l) && !fitsCourse(l));

  return (
    <>
      {fitting.length > 0 && others.length > 0 && (
        <h2 className={`mt-2 ${sectionHeading}`}>Fits {code}</h2>
      )}
      {fitting.map((listing) => (
        <Copy key={listing.id} listing={listing} courseId={courseId} code={code} />
      ))}
      {others.length > 0 && (
        <h2 className={`mt-2 ${sectionHeading}`}>Other editions: may not work</h2>
      )}
      {others.map((listing) => (
        <Copy key={listing.id} listing={listing} courseId={courseId} code={code} />
      ))}
      <RequestPrompt courseId={courseId} code={code} hasCopies={listings.length > 0} />
    </>
  );
}
