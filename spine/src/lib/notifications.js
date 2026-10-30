import { getMatches } from "./shelf";
import { getWaitlists } from "./waitlists";

// The signed-in student's feed, built from the stand-in data: buyers matched to
// books on their shelf, and "Looking for" requests they're still waiting on.
export function getNotifications() {
  return [
    ...getMatches().map(({ id, buyer, course }) => ({
      id,
      side: "selling",
      href: `/matches/${id}`,
      title: `${buyer} wants your ${course.code} book`,
      detail:
        "Other students with a copy may have been matched too. The first to accept gets it, so review the request soon.",
    })),
    ...getWaitlists().map(({ course, daysLeft }) => ({
      id: `waitlist-${course.id}`,
      side: "buying",
      href: `/browse/${course.id}`,
      title: `Still looking for a ${course.code} book`,
      detail: `No copies listed yet. Your request lasts ${daysLeft} more days.`,
    })),
  ];
}