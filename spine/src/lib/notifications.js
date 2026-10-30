"use client";

import { useMemo } from "react";
import { useMatches } from "./matchState";
import { useListings } from "./myListings";
import { useRequests } from "./myRequests";

// The signed-in student's feed, live from this visit's data: buyers matched to
// books on their shelf who still need a reply, and "Looking for" requests
// they're still waiting on.
export function useNotifications() {
  const matches = useMatches();
  const requests = useRequests();
  const listings = useListings();

  return useMemo(
    () => [
      ...matches
        .filter(({ status }) => status === "open")
        .map(({ id, buyer, course }) => ({
          id,
          side: "selling",
          href: `/matches/${id}`,
          title: `${buyer} wants your ${course.code} book`,
          detail:
            "Other students with a copy may have been matched too. The first to accept gets it, so review the request soon.",
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
        };
      }),
    ],
    [matches, requests, listings],
  );
}
