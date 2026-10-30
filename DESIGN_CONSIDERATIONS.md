# Spine V2: Design Considerations

Group 8: Andrew Churchich, Charlie Pyle, Treggie Sebek

Spine's three core tasks are browsing available copies and requesting a book, posting a request for a book, and viewing your own shelf and offering one of your books. V2 keeps all three and focuses on usability. Three evaluators each did a cognitive walkthrough of one V1 task, then a heuristic evaluation against Nielsen's 10 heuristics (severity on a 0–4 scale).

## Feedback & Iteration

### 1. Browse led into the Post flow

**Finding.** Evaluator 3 (Task 1 walkthrough): "The distinction between posting on a listing and selling wasn't clear." Evaluator 2 found getting to the request form "a little confusing." In V1, Post and Browse opened the same "Search course" screen, and picking a course in Browse went to *Post a request*, so Task 1 couldn't be finished.

**Change.** We fixed the routing so Browse → course → listing → claim works end to end. Each entry screen now has its own title and a line saying what happens next, for example "Browse copies: Pick your course to see copies other students are selling." Every task screen also shows its step ("Step 1 of 3").

### 2. Buying and selling looked the same

**Finding.** Evaluator 3 rated Visibility severity 4 and Error prevention severity 3, warning that V1 "could result in someone accidentally putting up a book to sell." Evaluator 1 (H8, severity 4) said "the visuals between pages look fairly similar." The only cue was a tiny BUYING/SELLING badge, and the Claim button, a buying action, was green.

**Change.** Buying is now always blue and selling always green, in the header, badge, primary button and confirmation checkmark. Home groups its cards under "I need a book" and "I have a book." Following instructor feedback to "add images or logos," we added icons to the Home cards and bottom bar.

### 3. Send offer gave no immediate response

**Finding.** Evaluator 1 (H1 Visibility of system status, severity 3): with no loading state, "I (being impatient) click the button over and over until something happens."

**Change.** Send offer now switches to "Sending…" and disables itself the moment it's pressed, so a second tap does nothing. Offer this copy ("Opening…"), Post my request ("Posting…") and Claim this copy ("Claiming…") react the same way.

### 4. Notes didn't say what they were for or where they went

**Finding.** Evaluator 2 (H10 Help and documentation, severity 3) found "an unlabeled textbox" on the request form. Evaluator 1 (Task 3 walkthrough): "It is unclear where the text put in the notes section goes."

**Change.** The request note now has a visible label, "Note for sellers (optional)." Under the offer note, a line says it is "Sent to Marcus along with your price and condition," and the Offer sent screen shows the price, condition and note that were sent.

## Design Considerations

**Task Flow & Navigation.** All three tasks run end to end from Home (finding 1). The bottom bar highlights the current tab, and Home cards follow the bar's order. Dead ends lead somewhere: a course with no copies offers a "Looking for" request instead.

**Affordances & Signifiers.** Anything that looks tappable works. V1's inactive "Change" and "Message seller" controls were made functional or removed. Cards that lead somewhere have a chevron, primary actions are full-width buttons, and every field on the request and offer forms has a visible label, such as "Note for sellers (optional)" (finding 4).

**Feedback & System Status.** Home shows what's waiting with a summary card and an unread count on the bell. Step indicators show progress, and submit buttons react instantly (finding 3). Each confirmation screen restates what happened and what comes next ("Marcus has about a week to accept"), and Offer sent shows the offer itself (finding 4). Actions show up on every screen right away: after an offer, My Shelf says "Offer sent to Marcus" and the bell's count drops.

**Consistency & Predictability.** Blue always means buying and green always means selling (finding 2). Every flow has the same shape: choose, confirm, then a confirmation screen with an undo. Primary buttons share one style and sentence-case wording.

**Error Prevention & Recovery.** A second request for the same course is caught before posting. Copies that may not fit your section are flagged, and trying to claim one shows the problems with **See other copies** as the primary choice. The price field gives inline, plain-language errors. Every confirmed action can be undone: **Delete request**, **Withdraw offer**, **Release this copy**, or **Undo** after passing on a match.
