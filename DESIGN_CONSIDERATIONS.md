# Spine V2: Design Considerations

Group 8: Andrew Churchich, Charlie Pyle, Treggie Sebek

Version 1 of Spine supported our three core tasks: post a "Looking for" request, respond to a match with an offer, and browse listings to claim a copy. Version 2 keeps those tasks and focuses on usability. This document covers what the cognitive walkthroughs and heuristic evaluations found, what we changed in response (or why we didn't), and how the prototype now handles each of the five focus areas.

## Feedback & Iteration

> **TODO (team):** each finding has a **Source** line. Replace the placeholder with the specific walkthrough step or heuristic-evaluation note that raised it (evaluator, task, heuristic), and delete any finding no evaluator raised.

### 1. Task 3 couldn't be finished from the Browse tab

**Source:** TODO: cognitive walkthrough, Task 3 (for example, "evaluator picked STAT 210 in Browse and landed on Confirm request")

**What we saw in V1.** Choosing a course from Browse sent the user into the *Post a request* flow, because both tabs shared a course search that always linked to Post. The listing detail and "claimed" screens were also unreachable because of a routing mistake. A user following Task 3 hit a screen titled "Confirm request" with a Post request button. That screen doesn't match the goal, and it fails the walkthrough question "Will the user notice that the correct action is available?"

**What we changed.** We fixed both routing problems, so Browse → course → listing → claim works end to end. We also added a step indicator to every task screen ("Step 2 of 3") so users can see they are moving toward the goal and how far they have left.

### 2. Post and Browse looked identical, so users couldn't tell which one they were in

**Source:** TODO: heuristic evaluation (Consistency and standards / Recognition rather than recall)

**What we saw in V1.** Both tabs opened on a screen titled "Search course" with the same BUYING badge and the same course list. Nothing said what picking a course would do. One flow adds you to a waitlist and the other shows copies for sale.

**What we changed.**
- Each entry screen now has its own title ("Request a book" vs. "Browse copies") and a line that says what happens next ("We'll add you to its waitlist…" vs. "…see copies other students are selling").
- The course list shows a status beside each course that fits the flow: in Browse, how many copies each course has ("3 copies"); in Post, which waitlists you're already on.
- Search results that list copies now title themselves by course ("STAT 210 copies") instead of the generic "Listing results".

### 3. Several controls looked tappable but did nothing

**Source:** TODO: heuristic evaluation (Consistency and standards) or a walkthrough note where an evaluator tried one of these controls

**What we saw in V1.** "Change" next to the book's condition, the "Not interested" text on a match and the "Message seller" button after a claim all looked interactive and did nothing. On Home, the "C" avatar had the same gold square styling as the notification bell, so it looked like a second button. The bell itself led to an empty screen.

**What we changed.** Every interactive-looking element now works, and anything that isn't interactive no longer looks it:
- "Change" became a real condition dropdown.
- "Not interested" is an underlined link that declines the request, with a confirmation and an undo.
- "Message seller" was removed. The claim screen now says the seller has been told and will message you, which is honest about what the prototype does.
- The avatar was removed. There's no account screen behind it, so it only competed with the bell.
- The bell opens a real notifications feed (finding 6).

### 4. Nothing warned users before they claimed a copy that wouldn't work

**Source:** TODO: cognitive walkthrough, Task 3 "incorrect choice" path / heuristic evaluation (Error prevention)

**What we saw in V1.** Priya's 4th edition isn't accepted for STAT 210, but claiming it worked exactly like claiming a good copy. The compatibility list on the detail screen used bare ✓/✗ characters in small body text, with no color and no summary. Users had to read every line to learn that a copy wouldn't work, and nothing on the results list hinted at it.

**What we changed.**
- **Results list:** each copy carries a "✓ Fits your section" or "! May not fit your section" chip, so users can choose before opening one.
- **Detail screen:** a summary banner opens the screen ("Works for your STAT 210 section" / "May not work for STAT 210: 1 problem below"). Each requirement is a colored ✓/✗/– row with plain wording, and the study-guide line is marked as optional information instead of a pass/fail check.
- **Claiming a copy that may not fit:** the first tap shows an inline warning listing the problems. **See other copies** is the primary button and **Claim anyway** the secondary one, so the safe choice is the easy one but the user still has the final say.

### 5. Mistakes were hard to catch and impossible to take back

**Source:** TODO: heuristic evaluation (Help users recognize, diagnose and recover from errors / User control and freedom)

**What we saw in V1.** The offer price relied on the browser's built-in validation, which shows a generic tooltip and rejects reasonable input like "$20". Nothing stopped a user from joining a waitlist they were already on. Once a request, offer or claim was confirmed, there was no way back.

**What we changed.**
- **Price:** the field checks itself when the user leaves it or presses Send. Messages appear inline in plain language ("Enter a price.", "Use whole dollars, like 20.", "The price has to be at least $1."), the field is outlined in red, and focus jumps back to it. A leading "$" is accepted. A price more than twice the typical range gets a soft warning ("Marcus may pass on it") that doesn't block sending, since it is a judgment call and not an error.
- **Duplicate requests:** picking a course you're already waitlisted for (MATH 106 in our sample data) shows "You're already on the MATH 106 waitlist" and how long your spot lasts, with buttons to browse that course or pick another.
- **Undo:** every confirmation screen now has an undo: **Leave waitlist**, **Withdraw offer**, **Release this copy**, and **Undo** after declining a match. Each one explains what happened and offers a way to try again.
- **Dead ends:** a course with no listings now offers "Join the waitlist" instead of just "No copies listed yet". Searching for a course that doesn't exist suggests the expected format and offers **Clear search**.

### 6. Users couldn't tell where they were or what was waiting for them

**Source:** TODO: heuristic evaluation (Visibility of system status)

**What we saw in V1.** The bottom bar showed four identical orange dots, so nothing marked the current tab. The Home cards were in a different order from the bar. The notifications screen was empty, so a buyer match could only be found by opening My Shelf.

**What we changed.**
- **Bottom bar:** each tab has an icon, and the current tab is highlighted with an accent bar and bold label. Screens inside a task keep their parent tab lit; a match stays under Shelf, for example.
- **Home:** cards now follow the bar's order. A summary card at the top lists what's new ("Marcus wants your STAT 210 book", "Still waiting on MATH 106"), and the bell shows an unread count.
- **Notifications:** a rebuilt feed links straight to Marcus's match, giving Task 2 a second, more natural starting point.
- **My Shelf:** a book with a waiting buyer now has a gold border and a "Review ›" cue, while books with no requests look visibly quieter.

### 7. Buying and selling needed more visual separation (instructor feedback)

**Source:** Instructor feedback on our Figma design: "better variation between buying and selling" and "add images or logos to break up the page" (`InstructorFeedback.txt`).

**What we saw in V1.** The only cue was a tiny 9px BUYING/SELLING badge, and the primary buttons were mixed: gold for most, but a green Claim button even though claiming is a buying action.

**What we changed.**
- **Side colors:** buying is consistently blue and selling green. The side color appears in the header stripe, a larger header badge, the primary button and the confirmation checkmark.
- **Home:** the cards are grouped under "I need a book" (blue) and "I have a book" (green).
- **Images and logos:** we added an icon to each Home card and to the bottom bar, a logo mark in the Home header, and a generated book "cover" showing the course code on every book card.

### 8. Not changed: actions don't carry over to other screens

**Source:** TODO: confirm whether evaluators raised this. It shows up whenever a task is repeated, e.g. My Shelf still shows Marcus's request after an offer is sent.

**Decision.** We kept the prototype stateless. Each task is evaluated on its own, starting from Home, and the sample data already shows the states we wanted to test: an existing waitlist (MATH 106), a pending match and an incompatible listing. Remembering actions across screens would mean adding a data store and reset controls without testing any new design idea. The undo on each confirmation screen covers the recovery behavior we wanted evaluators to see. The README lists this as a known limitation so testers aren't surprised.

## Design Considerations

### Task Flow & Navigation

All three tasks now run end to end from Home with no detours (finding 1), and the two buying flows are clearly told apart from their first screen (finding 2). Every task screen shows its step ("Step 1 of 3"). The bottom bar highlights the current tab, including inside a task (finding 6), and Home lists the tabs in the bar's order, grouped by buying and selling. Dead ends now lead somewhere: a course with no copies points to its waitlist, and a listing that doesn't fit points back to the other copies. Task 2 can start from My Shelf or from the notification it is about.

### Affordances & Signifiers

Anything tappable now looks it, and anything that looks tappable works (finding 3). Cards that lead somewhere have a chevron, text actions such as "Not interested" and "Join the waitlist" are underlined, and every primary action is a full-width button. The shelf book that needs attention gets a gold border and a "Review ›" cue. Icons on Home and the bottom bar make each destination recognizable at a glance (finding 7). The avatar on Home, which looked like a button but led nowhere, was removed.

### Feedback & System Status

The prototype tells users what is going on before, during and after each task:
- **Before:** the Home summary card and the bell's unread count show what's waiting. Course lists show copy counts and existing waitlists.
- **During:** step indicators show progress. The fit chips, banner and colored checks show whether a copy works for your section (finding 4). The price field reacts to what's typed (finding 5).
- **After:** each confirmation screen restates what happened, gives a one-line summary ("Intro to Statistics · STAT 210 · held 7 days") and says what comes next ("Marcus has about a week to accept").

### Consistency & Predictability

Color now carries one meaning per side (finding 7): blue is always buying and green always selling, in headers, badges, primary buttons and checkmarks. Every main button shares one shared style and sentence-case wording ("Post request", "Send offer", "Claim this copy"), replacing V1's mix of ALL CAPS and title case. All three flows follow the same shape: search or review, then confirm, then a confirmation screen with an undo. Book cards look the same on the shelf, in listings and on a match. The back arrow returns to the previous step of the task. The one exception, listed in the README, is a match opened from Notifications, which backs out to My Shelf.

### Error Prevention & Recovery

**Prevention:**
- Duplicate waitlist requests are caught before posting.
- Incompatible copies are flagged in the list, explained on the detail screen and confirmed before claiming.
- The price field suggests a starting value and shows the typical range.

**Recognition:** errors appear inline, next to the field, in plain language, and focus moves to the problem. Advisory warnings (an unusually high price) are visibly different from blocking errors.

**Recovery:**
- Every confirmed action can be undone from its confirmation screen.
- Declining a match can be reversed.
- An empty search offers **Clear search**.
- Every warning offers a safe way back. (Findings 4 and 5.)
