# Spine

Group 8: Andrew Churchich, Charlie Pyle, Treggie Sebek

Spine is a phone-style web prototype for buying and selling used course textbooks between students. This is **Version 2**, revised after our cognitive walkthroughs and heuristic evaluations. What changed and why is in [DESIGN_CONSIDERATIONS.md](DESIGN_CONSIDERATIONS.md).

## Who it's for

College students who need a textbook for a course this term and would rather not pay bookstore prices, and students who have finished a course and want to sell their copy to someone who needs it. Buyers join a waitlist for each course instead of hunting for one seller, and sellers are told when someone on that waitlist wants a book they own.

## The three tasks

Start each task on the Home screen. The bar along the bottom (Home, Browse, Post, Shelf) is on every screen and highlights where you are. The arrow at the top left goes back. Buying screens are marked in blue and selling screens in green.

1. **Browse available copies and request a book.** You need the textbook for STAT 210. Browse the copies other students have listed, find one that fits your section, and claim it.
2. **Post a request for a book.** You need the textbook for ENGL 105 and nobody is selling one yet. Post a "Looking for" request so you're told when a copy is listed.
3. **View your shelf and offer one of your books.** Open My Shelf, find the book another student has asked for, and send them an offer.

Each task ends on a confirmation screen with a checkmark, a summary, a "Back to Home" button and a way to undo (release the copy, delete the request, withdraw the offer).

## Running it

You need **Node.js 20.9 or newer** (npm comes with it; download the LTS version from https://nodejs.org; we tested with Node 22.20.0), a web browser (Chrome, Edge, Firefox or Safari) and an internet connection to install packages and load fonts. There is no login, account or database to set up.

Get the files:

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