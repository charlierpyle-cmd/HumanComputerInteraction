import { getCourse } from "./courses";

// Stand-in for the "Looking for" requests the signed-in student already has
// when the app opens. lib/myRequests.js keeps the live copy.
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

// The seed rows, with each course's code and title filled in.
export function getRequestSeed() {
  return waitlists.map(({ courseId, ...rest }) => {
    const course = getCourse(courseId);
    return { courseId, code: course.code, courseTitle: course.title, ...rest };
  });
}
