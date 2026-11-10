import { getCourse } from "./courses";

// Stand-in for copies other students have posted. Prototype data only.
// type: "sell" | "giveaway"   status: "available" | "pending" | "claimed"
// A copy fits when it's the edition its course requires (see getFitChecks).
const listings = [
  {
    id: "intro-stats-5e-elena",
    courseId: "stat-218",
    title: "Introduction to Statistics, 5th ed.",
    edition: "5th edition",
    condition: "Good condition",
    conditionNote: "light highlighting",
    seller: "Elena",
    ownerId: "elena",
    sellerResponse: "Responds within a day",
    price: 20,
    type: "sell",
    status: "available",
    studyGuideIncluded: false,
  },
  {
    id: "intro-stats-4e-priya",
    courseId: "stat-218",
    title: "Introduction to Statistics, 4th ed.",
    edition: "4th edition",
    condition: "Fair condition",
    seller: "Priya",
    ownerId: "priya",
    price: 12,
    type: "sell",
    status: "available",
    studyGuideIncluded: false,
  },
  {
    id: "intro-stats-5e-bookstore",
    courseId: "stat-218",
    title: "Introduction to Statistics, 5th ed.",
    edition: "5th edition",
    condition: "New",
    seller: "Campus Bookstore",
    ownerId: "bookstore",
    price: 95,
    type: "sell",
    status: "available",
    studyGuideIncluded: true,
  },
  {
    id: "intro-stats-5e-sam",
    courseId: "stat-218",
    title: "Introduction to Statistics, 5th ed.",
    edition: "5th edition",
    condition: "Good condition",
    seller: "Sam",
    ownerId: "sam",
    price: 0,
    type: "giveaway",
    status: "available",
    studyGuideIncluded: false,
  },
  {
    id: "data-structures-4e-owen",
    courseId: "csce-156",
    title: "Data Structures in Java, 4th ed.",
    edition: "4th edition",
    condition: "Like new",
    seller: "Owen",
    ownerId: "owen",
    sellerResponse: "Responds within a few hours",
    price: 35,
    type: "sell",
    status: "available",
  },
  {
    id: "discrete-math-8e-ethan",
    courseId: "csce-235",
    title: "Discrete Mathematics, 8th ed.",
    edition: "8th edition",
    condition: "Good condition",
    seller: "Ethan",
    ownerId: "ethan",
    price: 28,
    type: "sell",
    status: "available",
  },
  {
    id: "discrete-math-7e-lily",
    courseId: "csce-235",
    title: "Discrete Mathematics, 7th ed.",
    edition: "7th edition",
    condition: "Fair condition",
    seller: "Lily",
    ownerId: "lily",
    price: 10,
    type: "sell",
    status: "available",
  },
  {
    id: "physics-10e-ava",
    courseId: "phys-211",
    title: "Physics for Scientists and Engineers, 10th ed.",
    edition: "10th edition",
    condition: "Like new",
    seller: "Ava",
    ownerId: "ava",
    price: 45,
    type: "sell",
    status: "available",
  },
  {
    id: "biology-6e-maya",
    courseId: "life-120",
    title: "Foundations of Biology, 6th ed.",
    edition: "6th edition",
    condition: "Good condition",
    seller: "Maya",
    ownerId: "maya",
    price: 30,
    type: "sell",
    status: "pending",
  },
];

function withCourse(listing) {
  return { ...listing, course: getCourse(listing.courseId) };
}

// Route params for every listing screen, which sits under its own course.
export function getListingParams() {
  return listings.map(({ id, courseId }) => ({ courseId, listingId: id }));
}

// Claimed copies are gone from browse; "pending" copies still show (with a note).
export function getListingsForCourse(courseId) {
  return listings
    .filter((l) => l.courseId === courseId && l.status !== "claimed")
    .map(withCourse);
}

// Takes the course too, so a listing can't be opened under another course's URL.
export function getListing(courseId, id) {
  const listing = listings.find((l) => l.courseId === courseId && l.id === id);
  return listing && withCourse(listing);
}

export function isFree(listing) {
  return listing.type === "giveaway";
}

export function formatPrice(listing) {
  return isFree(listing) ? "Free" : `$${listing.price}`;
}

// Reads a price the seller typed. Returns { price } or { error } to show them.
// "$20" and "20.00" are fine; cents aren't, since buyers pay in whole dollars.
export function parsePrice(text) {
  const digits = text.trim().replace(/^\$\s*/, "").replace(/\.0{1,2}$/, "");
  if (!digits) return { error: "Enter a price." };
  if (!/^\d+$/.test(digits)) return { error: "Use whole dollars, like 20." };
  const price = Number(digits);
  if (price < 1) return { error: "The price has to be at least $1." };
  return { price };
}

// Whether a copy is the edition its course requires.
export function fitsCourse(listing) {
  const { requiredBook } = getCourse(listing.courseId);
  return !requiredBook || listing.title === requiredBook.title;
}

// Whether a copy works for the buyer's course, one line per requirement.
// "problem" lines are the reasons a copy may not work; "info" is just a heads-up.
export function getFitChecks(listing) {
  const { code, requiredBook } = getCourse(listing.courseId);
  const checks = [
    !requiredBook
      ? { status: "info", text: `${code} hasn’t posted its book yet` }
      : fitsCourse(listing)
        ? { status: "ok", text: `${listing.edition} is the edition ${code} requires` }
        : {
            status: "problem",
            text: `${code} requires the ${requiredBook.edition}, not the ${listing.edition}`,
          },
  ];
  if (listing.studyGuideIncluded !== undefined) {
    checks.push(
      listing.studyGuideIncluded
        ? { status: "ok", text: "Study guide supplement included" }
        : { status: "info", text: "Study guide supplement not included (optional)" },
    );
  }
  return checks;
}

export function getFitProblems(listing) {
  return getFitChecks(listing)
    .filter(({ status }) => status === "problem")
    .map(({ text }) => text);
}
