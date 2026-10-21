# spine: Startup Instructions

Group 8: Andrew Churchich, Charlie Pyle, Treggie Sebek

spine is a phone-style web prototype for buying and selling used course textbooks. It runs on your own computer in a web browser. There is no login, account or database to set up.

## What you need

- **Node.js 20.9 or newer.** npm comes with it. Download the LTS version from https://nodejs.org. We tested with Node 22.20.0.
- **A web browser:** Chrome, Edge, Firefox or Safari.
- **An internet connection** to install packages and load fonts.

Nothing else needs to be installed. To check your Node version, run `node --version` in a terminal.

## Getting the files

- **From the Canvas zip:** unzip it. You'll get a folder containing this README and a `spine` folder.
- **From GitHub:** run `git clone https://github.com/charlierpyle-cmd/HumanComputerInteraction.git`

## Running it

Open a terminal in the folder that contains this README, then run:

```
cd spine
npm install
npm run dev
```

The first `npm install` takes a minute or two. When the terminal shows `Ready`, open **http://localhost:3000** in your browser.

To stop the server, press `Ctrl+C` in the terminal.

The commands are the same on Windows, macOS and Linux.

### Viewing it at phone size

spine is designed as a phone app. On a desktop browser it shows up as a narrow column in the middle of the window, and that works fine. To see it at true phone size, open the browser's developer tools (`F12`), turn on device mode (`Ctrl+Shift+M`, or `Cmd+Shift+M` on a Mac) and pick a phone.

## The three tasks

Start each task on the Home screen. The bar along the bottom (Home, Browse, Post, Shelf) is on every screen, and the arrow at the top left goes back.

1. **Post a "Looking for" request.** You need the textbook for STAT 210 and nobody is selling one yet. Join the waitlist so you're told when a copy is listed.
2. **Respond to a match and make an offer.** Another student wants a textbook you own. Send them an offer for it.
3. **Browse listings and claim a copy.** Find a copy listed for your course that fits your section, and claim it.

Each task ends on a confirmation screen with a checkmark and a "Back to Home" button.
