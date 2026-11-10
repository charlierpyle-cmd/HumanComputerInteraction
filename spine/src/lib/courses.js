// Stand-in course directory: real UNL courses (codes and titles from UNL's
// catalog and class schedules), sorted by code. The prototype assumes this
// data already exists; how it gets populated is out of scope.
//
// `requiredBook` is the book the course lists for the term, or null when it
// hasn't been posted yet. Book titles are made up, not real publishers' books.
export const CURRENT_TERM = "Spring 2027";

export const courses = [
  {
    id: "csce-155a",
    code: "CSCE 155A",
    title: "Computer Science I",
    requiredBook: { title: "Problem Solving with C, 3rd ed.", edition: "3rd edition" },
  },
  {
    id: "csce-156",
    code: "CSCE 156",
    title: "Computer Science II",
    requiredBook: { title: "Data Structures in Java, 4th ed.", edition: "4th edition" },
  },
  {
    id: "csce-235",
    code: "CSCE 235",
    title: "Introduction to Discrete Structures",
    shortTitle: "Discrete Structures",
    requiredBook: { title: "Discrete Mathematics, 8th ed.", edition: "8th edition" },
  },
  {
    id: "csce-378",
    code: "CSCE 378",
    title: "Human-Computer Interaction",
    requiredBook: { title: "Designing Interactive Systems, 4th ed.", edition: "4th edition" },
  },
  {
    id: "engl-151",
    code: "ENGL 151",
    title: "Writing for Change",
    requiredBook: { title: "Academic Writing, 3rd ed.", edition: "3rd edition" },
  },
  {
    id: "life-120",
    code: "LIFE 120",
    title: "Fundamentals of Biology I",
    shortTitle: "Biology I",
    requiredBook: { title: "Foundations of Biology, 6th ed.", edition: "6th edition" },
  },
  {
    id: "math-106",
    code: "MATH 106",
    title: "Analytic Geometry and Calculus I",
    shortTitle: "Calculus I",
    requiredBook: { title: "Calculus: Single Variable, 9th ed.", edition: "9th edition" },
  },
  {
    id: "phys-211",
    code: "PHYS 211",
    title: "General Physics I",
    requiredBook: { title: "Physics for Scientists and Engineers, 10th ed.", edition: "10th edition" },
  },
  {
    id: "psyc-181",
    code: "PSYC 181",
    title: "Introduction to Psychology",
    shortTitle: "Intro to Psychology",
    // Not posted yet for Spring: a request matches any PSYC 181 book.
    requiredBook: null,
  },
  {
    id: "soci-101",
    code: "SOCI 101",
    title: "Introduction to Sociology",
    shortTitle: "Intro to Sociology",
    requiredBook: { title: "Sociology in Everyday Life, 9th ed.", edition: "9th edition" },
  },
  {
    id: "soft-160",
    code: "SOFT 160",
    title: "Software Engineering I",
    requiredBook: { title: "Programming Foundations, 2nd ed.", edition: "2nd edition" },
  },
  {
    id: "soft-161",
    code: "SOFT 161",
    title: "Software Engineering II",
    requiredBook: { title: "Building Software Systems, 2nd ed.", edition: "2nd edition" },
  },
  {
    id: "soft-260",
    code: "SOFT 260",
    title: "Software Engineering III",
    requiredBook: { title: "Software Design Patterns, 3rd ed.", edition: "3rd edition" },
  },
  {
    id: "soft-261",
    code: "SOFT 261",
    title: "Software Engineering IV",
    requiredBook: null,
  },
  {
    id: "stat-218",
    code: "STAT 218",
    title: "Introduction to Statistics",
    shortTitle: "Intro to Statistics",
    requiredBook: { title: "Introduction to Statistics, 5th ed.", edition: "5th edition" },
  },
];

export function getCourse(id) {
  return courses.find((course) => course.id === id);
}

// The book's name without its edition, e.g. "Introduction to Statistics".
export function bookName(book) {
  return book.title.replace(/,\s*\d+\w*\s+ed\.$/, "");
}
