# Spine

Group 8: Andrew Churchich, Charlie Pyle, Treggie Sebek

Spine is a phone-style web prototype for buying and selling used course textbooks between students. This is **Version 2**, revised after our cognitive walkthroughs and heuristic evaluations. What changed and why is in [DESIGN_CONSIDERATIONS.md](DESIGN_CONSIDERATIONS.md).

## Who it's for

College students who need a textbook for a course this term and would rather not pay bookstore prices, and students who have finished a course and want to sell their copy to someone who needs it. Buyers join a waitlist for each course instead of hunting for one seller, and sellers are told when someone on that waitlist wants a book they own.

## The three tasks

Start each task on the Home screen. The bar along the bottom (Home, Browse, Post, Shelf) is on every screen and highlights where you are. The arrow at the top left goes back. Buying screens are marked in blue and selling screens in green.

1. **Post a "Looking for" request.** You need the textbook for STAT 210 and nobody is selling one yet. Join the waitlist so you're told when a copy is listed.
   - *Error path to try:* pick MATH 106. You're already on that waitlist, so Spine stops you from posting a duplicate.
2. **Respond to a match and make an offer.** Another student wants a textbook you own. Send them an offer for it. (Start from My Shelf or from the bell on Home.)
   - *Error paths to try:* clear the price, or enter `abc` or `0`, then press Send offer. You'll see an inline error. A price far above the typical range, like `200`, shows a warning but still lets you send. "Not interested" declines the request and can be undone.
3. **Browse listings and claim a copy.** Find a copy listed for your course (STAT 210) that fits your section, and claim it.
   - *Error path to try:* open Priya's 4th edition and press Claim this copy. Spine explains why it may not work for your section and offers to take you back to the other copies.

Each task ends on a confirmation screen with a checkmark, a summary, a "Back to Home" button and a way to undo (leave the waitlist, withdraw the offer, release the copy).

## Running it

You need **Node.js 20.9 or newer** (npm comes with it; download the LTS version from https://nodejs.org; we tested with Node 22.20.0), a web browser (Chrome, Edge, Firefox or Safari) and an internet connection to install packages and load fonts. There is no login, account or database to set up.

Get the files:

- **From the Canvas zip:** unzip it. You'll get a folder containing this README and a `spine` folder.
- **From GitHub:** `git clone https://github.com/charlierpyle-cmd/HumanComputerInteraction.git`

Open a terminal in the folder that contains this README, then run:

```
cd spine
npm install
npm run dev
```

The first `npm install` takes a minute or two. When the terminal shows `Ready`, open **http://localhost:3000** in your browser. To stop the server, press `Ctrl+C`. The commands are the same on Windows, macOS and Linux.

### Viewing it at phone size

Spine is designed as a phone app. On a desktop browser it shows up as a narrow column in the middle of the window, and that works fine. To see it at true phone size, open the browser's developer tools (`F12`), turn on device mode (`Ctrl+Shift+M`, or `Cmd+Shift+M` on a Mac) and pick a phone.

## Known limitations and simulated functionality

- **No backend and nothing is saved.** Every screen is built from fixed sample data in `spine/src/lib/`. Posting a request, sending an offer or claiming a copy moves you to the confirmation screen but doesn't change other screens. For example, My Shelf still shows Marcus's request after you send him an offer. Undo, leave, withdraw and release likewise only change the confirmation screen.
- **Sample data only.** There are six courses, two books on your shelf, one buyer match (Marcus, STAT 210) and three listings, all for STAT 210. Other courses have no listings and show the "join the waitlist" path instead. You are already on the MATH 106 waitlist.
- **Matching is simulated.** Marcus's match is pre-made. The prototype doesn't show how buyers on a waitlist are paired with sellers.
- **Messaging isn't built.** After a claim, Spine says the seller will message you. There is no messaging screen.
- **Notifications are a fixed feed.** The count on the bell doesn't clear after you read them.
- **Form inputs aren't used after submit.** The "Any edition is fine" switch, notes and the offer's condition are collected but not shown anywhere afterwards.
- **One fixed back path.** The back arrow on a match always returns to My Shelf, even if you opened the match from Notifications.
- **Phone layout and light theme only.** There is no dark mode and no desktop layout.
