import { getCourse } from "./courses";

// Stand-in for the "Looking for" requests the signed-in student already has
// when the app opens. lib/myRequests.js keeps the live copy.
// A request lasts 7 days. `book` and `minCondition` are described in
// lib/requestOptions.js.
const waitlists = [
  {
    courseId: "math-106",
    book: "required",
    minCondition: "any",
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
