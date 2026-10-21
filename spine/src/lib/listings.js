import { getCourse } from "./courses";

// Stand-in for copies sellers have posted. Prototype data only.
const listings = [
  {
    id: "intro-stats-5e-elena",
    courseId: "stat-210",
    title: "Introduction to Statistics, 5th ed.",
    condition: "Good condition",
    conditionNote: "light highlighting",
    seller: "Elena",
    sellerResponse: "Responds within a day",
    price: 20,
    requiresCode: false,
    acceptedEdition: true,
    studyGuideIncluded: false,
  },
  {
    id: "intro-stats-4e-priya",
    courseId: "stat-210",
    title: "Introduction to Statistics, 4th ed.",
    condition: "Fair condition",
    seller: "Priya",
    price: 12,
    requiresCode: true,
    acceptedEdition: false,
    studyGuideIncluded: false,
  },
  {
    id: "intro-stats-new-bookstore",
    courseId: "stat-210",
    title: "Introduction to Statistics, New",
    condition: "Bookstore",
    seller: "Bookstore",
    price: 95,
    requiresCode: false,
    acceptedEdition: true,
    studyGuideIncluded: false,
  },
];

function withCourse(listing) {
  return { ...listing, course: getCourse(listing.courseId) };
}

export function getListingsForCourse(courseId) {
  return listings.filter((l) => l.courseId === courseId).map(withCourse);
}

export function getListing(id) {
  const listing = listings.find((l) => l.id === id);
  return listing && withCourse(listing);
}