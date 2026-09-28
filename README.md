# CourseShelf — Digital Prototype README

Group 8 — Andrew Churchich, Charlie Pyle, Treggie Sebek

## The 3 tasks

- **Post a "Looking For" request.** A buyer signals they need a specific course's book before any listing for it exists, so a seller can be notified later instead of the buyer re-searching repeatedly.
- **Respond to a match and make an offer.** A seller (via My Shelf or the notification bell) is told someone wants a book they own, and sends a fixed-price offer.
- **Browse listings and claim a copy with fit verified.** A buyer searches by course, sees which listings need an access code before opening anything, and claims a copy confirmed to fit their section.

## Navigation

Start on **Home**. Three entry points, one per task: "Post what you need" (Task 1), "Browse available copies" (Task 3), and "My Shelf" or the bell icon (Task 2). Each task is a straight tap-through path that ends on a confirmation screen with a checkmark and a "Back to Home" button. Not every element is wired — "Not interested," "Message seller," and the price/condition "Change" link are decorative, since only one working path per task is required.

## What changed since the paper prototype and testing

Our paper prototype had three tasks: *Post an item* (a seller lists a book for sale), *Browse Listings* (a buyer browses, with a bidding option), and *View "My Shelf"* (unclear purpose). We tested it with 3 users and made three changes directly from what we saw:

- **"My Shelf" confused 2 of 3 testers** — they weren't sure if it was for buying or for viewing what they owned. We turned it into a specific seller flow: it's now where a seller sees "someone wants this" matches and responds, not a general-purpose screen.
- **Tester 2 called the bidding option "bad design."** We removed bidding entirely. A seller now sets one fixed price when responding to a request, and the buyer sees that price up front rather than negotiating live.
- **Tester 3 said listings didn't read as clickable, and suggested "Post" could say "Sell."** We gave listing rows visible card borders and status badges so they read as interactive. We did not rename "Post" to "Sell," though — our broader research (contextual inquiries, not just this test) found sellers almost never list proactively on their own, so the bigger fix was flipping who initiates: Task 1 became a buyer *requesting* a book instead of a seller listing one, with Task 2 (make an offer) as the seller's response to that request.

## Assumptions / limitations

- Assumes a course/section directory already exists to search against; how that data gets populated isn't shown.
- The 24-hour claim/offer window is a placeholder, untested value.
- "Message seller" and "Not interested" are non-functional dead ends by design.
- The "Search course" screen is duplicated once in Figma: the same screen needed to lead to two different next screens depending on whether you're posting a request (Task 1) or browsing existing copies (Task 3), which one frame can't do with a single click target. Every other screen is used once.