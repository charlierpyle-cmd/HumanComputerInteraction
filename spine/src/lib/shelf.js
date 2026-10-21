import { getCourse } from "./courses";

// Stand-in for the signed-in seller's shelf and the class-waitlist buyers
// matched to it. How matches get made is out of scope.
export const shelf = [
  {
    id: "intro-stats-5e",
    courseId: "stat-210",
    title: "Introduction to Statistics, 5th ed.",
    condition: "Good condition",
  },
  {
    id: "academic-writing-3e",
    courseId: "engl-105",
    title: "Academic Writing, 3rd ed.",
    condition: "Like new",
  },
];

const matches = [
  {
    id: "stat-210-marcus",
    bookId: "intro-stats-5e",
    buyer: "Marcus",
    buyerResponse: "Usually responds within a day",
    suggestedPrice: 20,
    typicalPrice: "$18–24",
  },
];

function withDetails(match) {
  const book = shelf.find(({ id }) => id === match.bookId);
  return { ...match, book, course: getCourse(book.courseId) };
}

export function getMatches() {
  return matches.map(withDetails);
}

export function getMatch(id) {
  const match = matches.find((match) => match.id === id);
  return match && withDetails(match);
}
