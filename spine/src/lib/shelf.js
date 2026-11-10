import { getCourse } from "./courses";

// The three conditions a seller can choose from, with what each one means.
export const CONDITIONS = ["Like new", "Good condition", "Fair condition"];

export const CONDITION_OPTIONS = [
  { value: "Like new", label: "Like new", description: "No marks or wear" },
  { value: "Good condition", label: "Good", description: "Some highlighting or wear" },
  { value: "Fair condition", label: "Fair", description: "Heavy wear, but every page is there" },
];

// Stand-in for the signed-in student's own books ("My Books") and the
// course-waitlist buyers matched to them. How matches get made is out of scope.
// None of these is for STAT 218 or PSYC 181, which the student needs books for.
export const shelf = [
  {
    id: "academic-writing-3e",
    courseId: "engl-151",
    title: "Academic Writing, 3rd ed.",
    condition: "Like new",
  },
  {
    id: "problem-solving-c-3e",
    courseId: "csce-155a",
    title: "Problem Solving with C, 3rd ed.",
    condition: "Good condition",
  },
  {
    id: "sociology-9e",
    courseId: "soci-101",
    title: "Sociology in Everyday Life, 9th ed.",
    condition: "Fair condition",
  },
];

const matches = [
  {
    id: "csce-155a-marcus",
    bookId: "problem-solving-c-3e",
    buyer: "Marcus",
    buyerResponse: "Usually responds within a day",
    suggestedPrice: 25,
    typicalRange: [20, 30],
  },
  {
    id: "soci-101-jordan",
    bookId: "sociology-9e",
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
