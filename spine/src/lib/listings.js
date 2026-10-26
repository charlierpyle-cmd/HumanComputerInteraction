import { getCourse } from "./courses";

// Stand-in for copies sellers have posted. Prototype data only.
const listings = [
  {
    id: "intro-stats-5e-elena",
    courseId: "stat-210",
    title: "Introduction to Statistics, 5th ed.",
    edition: "5th edition",
    condition: "Good condition",
    conditionNote: "light highlighting",
    seller: "Elena",
    sellerResponse: "Responds within a day",
    price: 20,
    acceptedEdition: true,
    studyGuideIncluded: false,
  },
  {
    id: "intro-stats-4e-priya",
    courseId: "stat-210",
    title: "Introduction to Statistics, 4th ed.",
    edition: "4th edition",
    condition: "Fair condition",
    seller: "Priya",
    price: 12,
    acceptedEdition: false,
    studyGuideIncluded: false,
  },
  {
    id: "intro-stats-5e-bookstore",
    courseId: "stat-210",
    title: "Introduction to Statistics, 5th ed.",
    edition: "5th edition",
    condition: "New",
    seller: "Campus Bookstore",
    price: 95,
    acceptedEdition: true,
    studyGuideIncluded: true,
  },
];

function withCourse(listing) {
  return { ...listing, course: getCourse(listing.courseId) };
}

// Route params for every listing screen, which sits under its own course.
export function getListingParams() {
  return listings.map(({ id, courseId }) => ({ courseId, listingId: id }));
}

export function getListingsForCourse(courseId) {
  return listings.filter((l) => l.courseId === courseId).map(withCourse);
}

// Takes the course too, so a listing can't be opened under another course's URL.
export function getListing(courseId, id) {
  const listing = listings.find((l) => l.courseId === courseId && l.id === id);
  return listing && withCourse(listing);
}

// Whether a copy works for the buyer's section, one line per requirement.
// "problem" lines are the reasons a copy may not work; "info" is just a heads-up.
export function getFitChecks(listing) {
  const { code } = getCourse(listing.courseId);
  return [
    listing.acceptedEdition
      ? { status: "ok", text: `${listing.edition} is accepted for ${code}` }
      : { status: "problem", text: `${listing.edition} isn't accepted for ${code}` },
    listing.studyGuideIncluded
      ? { status: "ok", text: "Study guide supplement included" }
      : { status: "info", text: "Study guide supplement not included (optional)" },
  ];
}

export function getFitProblems(listing) {
  return getFitChecks(listing)
    .filter(({ status }) => status === "problem")
    .map(({ text }) => text);
}

