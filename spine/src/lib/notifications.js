"use client";

import { useMemo } from "react";
import { createTable, useTable } from "./localTable";
import { useMatches } from "./matchState";
import { useListings } from "./myListings";
import { useRequests } from "./myRequests";

// Ids of notifications the student has already seen on the Notifications
// screen. Prototype only: like the rest of this visit's data, a reload clears it.
const seen = createTable([]);

// Call when the Notifications screen is showing these ids.
export function markAllSeen(ids) {
  const already = seen.get();
  const fresh = ids.filter((id) => !already.includes(id));
  if (fresh.length > 0) seen.set([...already, ...fresh]);
}

// The signed-in student's feed, live from this visit's data: buyers matched to
// their books who still need a reply, then "Looking for" requests they're
// still waiting on. Only a buyer's request is news that needs the student, so
// only those can be `unread`; a request status never lights the bell.
export function useNotifications() {
  const matches = useMatches();
  const requests = useRequests();
  const listings = useListings();
  const seenIds = useTable(seen);

  return useMemo(
    () => [
      ...matches
        .filter(({ status }) => status === "open")
        .map(({ id, buyer, course }) => ({
          id,
          side: "selling",
          href: `/matches/${id}?from=notifications`,
          title: `${buyer} wants your ${course.code} book`,
          detail: "Other sellers may have been asked too. The first to accept gets it.",
          unread: !seenIds.includes(id),
        })),
      ...requests.map(({ courseId, code, daysLeft }) => {
        const copies = listings.filter((l) => l.courseId === courseId).length;
        return {
          id: `waitlist-${courseId}`,
          side: "buying",
          href: `/browse/${courseId}`,
          title: `Still looking for a ${code} book`,
          detail: `${
            copies === 0
              ? "No copies listed yet."
              : `${copies === 1 ? "1 copy is" : `${copies} copies are`} listed.`
          } Your request lasts ${daysLeft} more days.`,
          unread: false,
        };
      }),
    ],
    [matches, requests, listings, seenIds],
  );
}
