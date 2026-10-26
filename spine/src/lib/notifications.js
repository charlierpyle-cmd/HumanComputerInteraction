import { getMatches } from "./shelf";
import { getWaitlists } from "./waitlists";

// The signed-in student's feed, built from the stand-in data: buyers matched to
// books on their shelf, and waitlists they're still waiting on.
export function getNotifications() {
  return [
    ...getMatches().map(({ id, buyer, course }) => ({
      id,
      side: "selling",
      href: `/matches/${id}`,
      title: `${buyer} wants your ${course.code} book`,
      detail: `Matched from the ${course.code} waitlist. Review the request to make an offer.`,
    })),
    ...getWaitlists().map(({ course, daysLeft }) => ({
      id: `waitlist-${course.id}`,
      side: "buying",
      href: `/browse/${course.id}`,
      title: `Still waiting on ${course.code}`,
      detail: `No copies listed yet. Your waitlist spot lasts ${daysLeft} more days.`,
    })),
  ];
}
