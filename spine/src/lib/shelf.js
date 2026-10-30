import { getCourse } from "./courses";

export const CONDITIONS = ["Like new", "Good condition", "Fair condition"];

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
  {
    id: "intro-psych-2e",
    courseId: "psyc-181",
    title: "Introduction to Psychology, 2nd ed.",
    condition: "Fair condition",
  },
];

const matches = [
  {
    id: "stat-210-marcus",
    bookId: "intro-stats-5e",
    buyer: "Marcus",
    buyerResponse: "Usually responds within a day",
    suggestedPrice: 20,
    typicalRange: [18, 24],
  },
  {
    id: "psyc-181-jordan",
    bookId: "intro-psych-2e",
    buyer: "Jordan",
    buyerResponse: "Usually responds within a few hours",
    suggestedPrice: 15,
    typicalRange: [12, 18],
  },
];

export function getBook(id) {
  return shelf.find((book) => book.id === id);
}

function withDetails(match) {
  const book = getBook(match.bookId);
  return { ...match, book, course: getCourse(book.courseId) };
}

export function getMatches() {
  return matches.map(withDetails);
}

export function getMatch(id) {
  const match = matches.find((match) => match.id === id);
  return match && withDetails(match);
}
