// Stand-in course directory. The prototype assumes this data already exists;
// how it gets populated is out of scope.
export const courses = [
  {
    id: "stat-210",
    code: "STAT 210",
    title: "Introduction to Statistics",
    shortTitle: "Intro to Statistics",
  },
  { id: "stat-212", code: "STAT 212", title: "Applied Regression" },
  { id: "engl-105", code: "ENGL 105", title: "Academic Writing" },
  { id: "math-106", code: "MATH 106", title: "Calculus I" },
  { id: "csce-155", code: "CSCE 155", title: "Computer Science I" },
  { id: "psyc-181", code: "PSYC 181", title: "Introduction to Psychology" },
];

export const CURRENT_TERM = "Fall term";

export function getCourse(id) {
  return courses.find((course) => course.id === id);
}
