import { getCourse } from "./courses";

// Stand-in for the "Looking for" requests the signed-in student already has.
// A request lasts 7 days. bookTitle is optional (empty = any book for the course).
const waitlists = [
  {
    courseId: "math-106",
    bookTitle: "",
    anyEdition: true,
    note: "",
    joinedDaysAgo: 4,
    daysLeft: 3,
  },
];

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

// Plain, serializable version of the seed data for client components that keep
// the student's own edits in localStorage (see lib/myRequests.js).
export function getRequestSeed() {
  return waitlists.map(({ courseId, ...rest }) => {
    const course = getCourse(courseId);
    return { courseId, code: course.code, courseTitle: course.title, ...rest };
  });
}