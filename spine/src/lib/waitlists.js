import { getCourse } from "./courses";

// Stand-in for the course waitlists the signed-in student is already on. A spot
// lasts 7 days.
const waitlists = [{ courseId: "math-106", joinedDaysAgo: 4, daysLeft: 3 }];

function withCourse(waitlist) {
  return { ...waitlist, course: getCourse(waitlist.courseId) };
}

export function getWaitlists() {
  return waitlists.map(withCourse);
}

export function getWaitlist(courseId) {
  const waitlist = waitlists.find((waitlist) => waitlist.courseId === courseId);
  return waitlist && withCourse(waitlist);
}
