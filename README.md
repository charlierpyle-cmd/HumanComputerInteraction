# Spine

Group 8: Andrew Churchich, Charlie Pyle, Treggie Sebek

Spine is a phone-style web prototype that helps UNL students buy and sell used course textbooks with each other. This is **Version 3**, the version we usability-test with eight participants. It was revised after our pilot session with our instructor, Dr. Bevins, and the November 4 in-class peer evaluations. What changed and why is in [DESIGN_CONSIDERATIONS.md](DESIGN_CONSIDERATIONS.md).

## Who it's for

Spine is for UNL students in two situations:

- **Buyers** need a textbook for next semester's courses and would rather not pay bookstore prices. They can browse the copies other students are selling, or request a book for a course and be told when someone lists one.
- **Sellers** have finished a course and want to sell their copy. They can list it on Browse, and they're told when a student needs a book they own.

## The three tasks

Start each task on Home. The bar along the bottom (Home, Browse, Request, My Books) is on every screen and highlights where you are, and the arrow at the top left goes back. Buying screens are marked in blue and selling screens in green.

1. **Browse available copies and claim one.** You're taking STAT 218 and want to claim a copy of *Introduction to Statistics, 5th ed.* that another student is selling. The 4th edition is listed too. Trying to claim it warns that it may not work for the class.
2. **Request a book.** You're taking PSYC 181, nobody is selling a copy, and the syllabus isn't posted. Post a request with a note telling sellers you need it soon. Requesting a course you've already requested (MATH 106) tells you so, so you don't end up with two requests.
3. **Sell a book from My Books.** You've finished ENGL 151 and want to list *Academic Writing, 3rd ed.* on Browse. You must choose the book's condition, and the price takes whole dollars, so "19.99" shows an error.

Each task ends on a confirmation screen with a summary, a "Back to Home" button and a way to undo it: release the copy, delete the request, or take the listing down. Undo asks before it removes anything.

My Books also shows two books other students have asked for. You can review a request and send an offer, which works the same way.

## Running it

You need:

- **Node.js 20.9 or newer.** npm comes with it. Download the LTS version from https://nodejs.org. We tested with Node 22.20.0.
- **A web browser:** Chrome, Edge, Firefox or Safari.
- **An internet connection**, to install packages and load fonts.

There is no login, account or database to set up.

Get the files:

- **From GitHub:** `git clone https://github.com/charlierpyle-cmd/HumanComputerInteraction.git`

Open a terminal in the folder that contains this README, then run:

```
cd spine
npm install
npm run dev
```

The first `npm install` takes a minute or two. When the terminal shows `Ready`, open **http://localhost:3000** in your browser. To stop the server, press `Ctrl+C`. The commands are the same on Windows, macOS and Linux.
s
### Viewing it at phone size

On a computer, Spine appears in a phone-shaped frame in the middle of the window. The frame is 390 × 844, the size of an iPhone 12 to 15, and it only shrinks if the window is shorter than that.

For our usability sessions, we use Chrome's phone view so every participant sees the same screen. To turn it on:

1. Open the developer tools (`F12`).
2. Turn on device mode (`Ctrl+Shift+M`, or `Cmd+Shift+M` on a Mac).
3. Pick the **iPhone 12 Pro** preset at 100% zoom.

On a narrow window, the app fills the whole window, as it would on a phone.

## Known limitations and simulated functionality

- **No accounts.** You're always the same student. Marcus and the other students, their requests and their listings are sample data.
- **Nothing is saved.** Changes last until you reload the page or restart the app, then everything resets to the sample data. This also means every participant starts from the same state.
- **Nothing is actually sent.** Claims, requests, offers and notifications only change what you see in the app. There's no messaging, payment or arranging a meet-up.
- **Sample books.** The course codes are real UNL Spring 2027 courses, but the books, copies and prices are made up.
- **Runs locally.** It runs on a laptop's local server, not a hosted site, and we test it in Chrome's phone view instead of on a real phone.
