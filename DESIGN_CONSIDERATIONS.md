# Spine: Design Considerations

Group 8: Andrew Churchich, Charlie Pyle, Treggie Sebek

## Version 3

V3 is the version we usability-test with eight participants. It keeps V2's three tasks: browse available copies and claim one, request a book, and sell a book from your own books. The changes come from two sources: our pilot session with our instructor, Dr. Bevins, who left notes on each task, and the in-class peer evaluations on November 4, where four classmates gave us feedback.

### Feedback & Iteration

#### 1. Notifications pulled attention away from the tasks

**Finding.** Dr. Bevins said the notification banner at the top of Home "looks like it should be addressed first." In the peer evaluations, two classmates also noticed it before the task buttons. One suggested showing only the newest notification in one line, or removing it. Dr. Bevins also noted that the bell's count never went away, even after we'd read our notifications.

**Change.** We took the second suggestion and removed the banner from Home. Updates now live behind the bell, so Home shows only the tasks. The bell now counts only another student's request for one of your books that you haven't seen, and the count clears as soon as you open Notifications. We kept the bell itself, because sellers need to hear when someone wants their book.

#### 2. "My Shelf" was the most confusing screen

**Finding.** Dr. Bevins called My Shelf the most confusing part of the app. They said the name was unclear and the course numbers on owned books didn't say which class each book was for. In the peer evaluations, one classmate said they probably wouldn't read the paragraph at the top of the screen.

**Change.**
- My Shelf is now **My Books**: on its Home card, its tab and its screen. A price-tag icon marks it as where you sell.
- Two headed sections replace the paragraph: "Students want these" and "Your other books."
- Every book card says which class it's for in readable text, for example "For ENGL 151 · Writing for Change." The tiny course code on the drawn cover is no longer the only place it appears.
- "Manage my requests" is about buying, so it moved to the Request screen.

#### 3. Headings were too small and small text added noise

**Finding.** Dr. Bevins and two classmates in the peer evaluations found the headings too small. "I need a book" and "I have a book" were smaller than the card titles under them. Dr. Bevins said much of the small helper text wasn't needed, naming "whole dollars" and "buyers see this price before they claim it." A classmate said the intro text on the request screen wasn't needed and the search bar could go in its place.

**Change.**
- **One type scale everywhere:**
  - screen titles: 20px
  - section headings: 18px bold, in the side's color
  - card titles: 16–17px
  - no readable text below 12px (only the drawn book covers are smaller, and they're decoration)
- **Removed:** the two price lines, the listing form's footer, the request form's "lasts 7 days" line, and the intro paragraphs on Browse, Request and each course's copies. Search is now the first thing on Browse and Request. The confirmation screens still say how long a request or hold lasts.

#### 4. What could and couldn't be tapped wasn't always clear

**Finding.** Dr. Bevins asked us to avoid pill shapes for things that aren't buttons, such as "MATCH" and "2 requests," and noted that the cursor didn't change consistently over buttons. In the peer evaluations, a classmate asked that every button work and that the bottom bar highlight on hover.

**Change.**
- Every pill on something you can't tap is now plain colored text. "MATCH" became "Marcus wants this for CSCE 155A." "2 requests" became "2 students want your books." The BUYING/SELLING header label and the copy tags such as "✓ Fits STAT 218" are plain text too.
- The inconsistent cursor came from our CSS framework, which shows the arrow cursor on buttons. Now every button, option and link shows the hand.
- Buttons, cards and bottom-bar tabs change color on hover.
- We tapped through every control on every screen to confirm each one does something.

#### 5. Sellers weren't made to choose a condition, and deletes had no check

**Finding.** Dr. Bevins asked for error handling so a seller must list the book's condition, instead of having it filled in for them. They wanted it chosen with buttons or a dropdown, not typed. They also asked for a confirmation before deleting a post.

**Change.**
- Condition is now three large options with a short description each: Like new, Good, Fair. None is picked in advance. Listing without one shows "Choose the book's condition." The offer form works the same way.
- Every undo that removes something now asks first, with a red confirm button and "Keep it." That covers deleting a request, taking a listing down, withdrawing an offer and releasing a copy. My requests already did this.
- The price still accepts whole dollars only, but "$20" and "20.00" now work.

#### 6. Buyers couldn't tell whether a copy fit their class

**Finding.** Dr. Bevins asked for a way to confirm a book is the one the class needs. They also asked to let students pick editions, filter out editions that won't work, and base the scenarios on real classes offered that semester. In the peer evaluations, a classmate asked to pick a condition when requesting a book, and for autofill or a dropdown when searching for books.

**Change.**
- **Real courses.** The app uses real UNL courses for Spring 2027, including CSCE and SOFT courses. Task 1 uses STAT 218 and Task 3 uses ENGL 151, since STAT 210 and ENGL 105 aren't UNL courses.
- **Copies screen.** Each course's copies screen opens with its required book, for example "Required book: Introduction to Statistics, 5th ed." Matching copies come first, under "Fits STAT 218," and other editions follow under "Other editions: may not work."
- **Request form.** A choice of the required edition, any edition, or any book for the course replaces the free-text "Specific book" field. It also asks for the lowest condition you'll accept. When a course hasn't posted its book (PSYC 181), the form says any book will match.
- **Search** now also matches book titles, so typing "statistics" finds STAT 218.

**What we didn't change.**
- We didn't hide older editions. Some students can use them, so they stay visible in their own section. Claiming one still brings up a warning, and that is how our usability test measures error recovery.
- We didn't build a separate autocomplete dropdown. The course list already narrows as you type, and choosing a book is now a list of options, not typing.

#### 7. The screen didn't look like a phone

**Finding.** Dr. Bevins said the pages shifted and weren't a typical phone screen size. They asked us to test on a phone, or set the laptop window so the scale stays consistent.

**Change.**
- **Phone frame.** On a computer, Spine now sits in a 390 × 844 frame, the size of an iPhone 12 to 15. If the window is too short, the frame shrinks but keeps the same shape.
- **No more shifting.** Home's header is now the same height as every other screen's. The frame scrolls without a visible scrollbar, as a phone does. Together these stop the content moving between screens.
- **Same setup for every session.** We use Chrome's iPhone 12 Pro view on the same laptop. We didn't switch to a real phone, because the prototype runs on the laptop's local server, and a phone can't reach that without extra network setup.

### Design Considerations

**Visual Hierarchy & Layout.** Home leads with the tasks: two buying cards under "I need a book," then My Books under "I have a book." Nothing else competes with them: updates are behind the bell (finding 1). Screens that list things are grouped under headings rather than introduced by a paragraph:

- "Fits STAT 218" and "Other editions"
- "Students want these" and "Your other books"

On task screens, the main button sits at the bottom within thumb reach, and every screen keeps the same header and bottom bar inside a fixed phone frame (findings 2, 6, 7). Make an offer is our longest form, so it uses slightly smaller text and tighter spacing. The whole form and its Send offer button fit on one screen without scrolling, even with the condition error and a price message showing.

**Typography & Content Clarity.** One type scale runs through the app, with bigger headings and no readable text below 12px (finding 3). We cut helper text that restated the obvious and kept the lines that answer a real question, such as "Sent to Marcus along with your price and condition." Labels use the same words everywhere:

- The Home cards, tabs and screen titles match: Browse, Request a book, My Books.
- The button names that our test plan refers to stayed the same: "Claim this copy," "Post my request" and "List on Browse."

Messages say what to do next: "Choose the book's condition," "Use whole dollars, like 20."

**Color & Visual Communication.**
- **Buying and selling.** Blue still means buying and green means selling, in headers, headings, buttons and confirmation checkmarks. The "Buying" or "Selling" label at the top right of each header is in its side's color too, in a lighter shade that reads on the dark header.
- **Gold and red.** Gold marks things that need you, such as "Marcus wants this for CSCE 155A." Red is reserved for errors, the unread count, and the last tap of a delete.
- **No pills.** Status is shown as colored text with a symbol, not pill shapes, so color never suggests a button (finding 4).
- **Contrast.** We darkened the gray text, the selling green and the gold text so every text color reaches at least 4.5:1 on our backgrounds. The lighter blue and green in the header reach about 8:1 on its dark background. Nothing white sits on light gold or orange.

**Accessibility & Inclusive Design.**
- **Color isn't the only cue.** Every color cue also has a word or symbol: "Buying" and "Selling" in the header, "✓ Fits" and "! May not fit" on copies.
- **Tap targets** are at least 44px tall, including the back arrow, book actions and text links.
- **Keyboard.** A visible focus ring follows the keyboard, white on dark headers.
- **Screen readers.**
  - Choices are real radio buttons, grouped and labeled for screen readers.
  - Errors and status changes are announced.
  - The "are you sure?" step moves focus to "Keep it."
- **Zoom.** When the window is narrower than a tablet, for example when zoomed in, the frame drops away and the app fills the window.
- **Fewer chances to mistype.** Choosing a condition or a book from options replaces typing, which helps anyone who finds text entry on a phone hard.

**Interaction Quality.**
- **Feedback.** Every tap gets an immediate response, and every control changes on hover. Buttons change to "Claiming…," "Posting…" or "Sending…" and can't be tapped twice. Each flow ends on a confirmation that restates what happened.
- **Control.** The back arrow and bottom bar are always there. Every completed action can be undone, and the undos that remove something ask first (finding 5).
- **Recovery.** Errors are caught where they happen, in plain language:
  - a copy that may not fit your class
  - a course you've already requested
  - a missing condition or a price with cents
  - a request another seller accepted first

## Version 2

Spine's three core tasks are browsing available copies and requesting a book, posting a request for a book, and viewing your own shelf and offering one of your books. V2 keeps all three and focuses on usability. Three evaluators each did a cognitive walkthrough of one V1 task, then a heuristic evaluation against Nielsen's 10 heuristics (severity on a 0–4 scale).

### Feedback & Iteration

#### 1. Browse led into the Post flow

**Finding.** Evaluator 3 (Task 1 walkthrough): "The distinction between posting on a listing and selling wasn't clear." Evaluator 2 found getting to the request form "a little confusing." In V1, Post and Browse opened the same "Search course" screen, and picking a course in Browse went to *Post a request*, so Task 1 couldn't be finished.

**Change.** We fixed the routing so Browse → course → listing → claim works end to end. Each entry screen now has its own title and a line saying what happens next, for example "Browse copies: Pick your course to see copies other students are selling." Every task screen also shows its step ("Step 1 of 3").

#### 2. Buying and selling looked the same

**Finding.** Evaluator 3 rated Visibility severity 4 and Error prevention severity 3, warning that V1 "could result in someone accidentally putting up a book to sell." Evaluator 1 (H8, severity 4) said "the visuals between pages look fairly similar." The only cue was a tiny BUYING/SELLING badge, and the Claim button, a buying action, was green.

**Change.** Buying is now always blue and selling always green, in the header, badge, primary button and confirmation checkmark. Home groups its cards under "I need a book" and "I have a book." Following instructor feedback to "add images or logos," we added icons to the Home cards and bottom bar.

#### 3. Send offer gave no immediate response

**Finding.** Evaluator 1 (H1 Visibility of system status, severity 3): with no loading state, "I (being impatient) click the button over and over until something happens."

**Change.** Send offer now switches to "Sending…" and disables itself the moment it's pressed, so a second tap does nothing. Offer this copy ("Opening…"), Post my request ("Posting…") and Claim this copy ("Claiming…") react the same way.

#### 4. Notes didn't say what they were for or where they went

**Finding.** Evaluator 2 (H10 Help and documentation, severity 3) found "an unlabeled textbox" on the request form. Evaluator 1 (Task 3 walkthrough): "It is unclear where the text put in the notes section goes."

**Change.** The request note now has a visible label, "Note for sellers (optional)." Under the offer note, a line says it is "Sent to Marcus along with your price and condition," and the Offer sent screen shows the price, condition and note that were sent.

### Design Considerations

**Task Flow & Navigation.** All three tasks run end to end from Home (finding 1). The bottom bar highlights the current tab, and Home cards follow the bar's order. Dead ends lead somewhere: a course with no copies offers a "Looking for" request instead.

**Affordances & Signifiers.** Anything that looks tappable works. V1's inactive "Change" and "Message seller" controls were made functional or removed. Cards that lead somewhere have a chevron, primary actions are full-width buttons, and every field on the request and offer forms has a visible label, such as "Note for sellers (optional)" (finding 4).

**Feedback & System Status.** Home shows what's waiting with a summary card and an unread count on the bell. Step indicators show progress, and submit buttons react instantly (finding 3). Each confirmation screen restates what happened and what comes next ("Marcus has about a week to accept"), and Offer sent shows the offer itself (finding 4). Actions show up on every screen right away: after an offer, My Shelf says "Offer sent to Marcus" and the bell's count drops.

**Consistency & Predictability.** Blue always means buying and green always means selling (finding 2). Every flow has the same shape: choose, confirm, then a confirmation screen with an undo. Primary buttons share one style and sentence-case wording.

**Error Prevention & Recovery.** A second request for the same course is caught before posting. Copies that may not fit your section are flagged, and trying to claim one shows the problems with **See other copies** as the primary choice. The price field gives inline, plain-language errors. Every confirmed action can be undone: **Delete request**, **Withdraw offer**, **Release this copy**, or **Undo** after passing on a match.
