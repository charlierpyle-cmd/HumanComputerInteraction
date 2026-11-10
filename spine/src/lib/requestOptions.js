import { bookName, getCourse } from "./courses";

// What a "Looking for" request can ask for, as choices rather than free text.
// A request stores `book` ("required" | "any-edition" | "any") and
// `minCondition` ("any" | "good" | "like-new").

// Which book the student wants. Empty when the course hasn't posted its book,
// since then any book for the course is the only sensible match.
export function bookOptions(course) {
  if (!course.requiredBook) return [];
  return [
    {
      value: "required",
      label: course.requiredBook.title,
      description: `The edition ${course.code} requires`,
    },
    {
      value: "any-edition",
      label: `Any edition of ${bookName(course.requiredBook)}`,
      description: "Older editions may not match your class",
    },
    { value: "any", label: `Any book for ${course.code}` },
  ];
}

export const MIN_CONDITION_OPTIONS = [
  { value: "any", label: "Any condition" },
  { value: "good", label: "Good or better" },
  { value: "like-new", label: "Like new only" },
];

// One line saying what a request asks for, e.g.
// "Introduction to Statistics, 5th ed. · Good or better".
export function describeRequest({ courseId, book, minCondition }) {
  const course = getCourse(courseId);
  const bookLabel =
    !course.requiredBook || book === "any"
      ? "Any book"
      : book === "any-edition"
        ? `Any edition of ${bookName(course.requiredBook)}`
        : course.requiredBook.title;
  const condition = MIN_CONDITION_OPTIONS.find(({ value }) => value === minCondition);
  return `${bookLabel} · ${condition?.label ?? "Any condition"}`;
}
