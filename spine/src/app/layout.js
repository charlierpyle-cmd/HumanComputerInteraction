import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import BottomNav, { NavBar } from "@/components/BottomNav";
import ScrollReset from "@/components/ScrollReset";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Spine",
  description: "Buy and sell used course textbooks.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* On a phone the app fills the screen. On anything wider it sits in a
          390 × 844 phone frame (an iPhone 12–15), scaled down only if the
          window is too short, so every screen keeps a phone's proportions. */}
      <body className="h-full bg-desk sm:flex sm:items-center sm:justify-center sm:p-4">
        <div className="flex h-dvh w-full flex-col overflow-hidden bg-paper text-ink sm:box-content sm:aspect-[390/844] sm:h-[min(844px,calc(100dvh-3.25rem))] sm:w-auto sm:rounded-[2.5rem] sm:border-[10px] sm:border-ink sm:shadow-2xl">
          <div id="app-scroll" className="phone-scroll flex min-h-0 flex-1 flex-col overflow-y-auto">
            {children}
          </div>
          {/* The current path isn't known while prerendering some routes. */}
          <Suspense fallback={<NavBar />}>
            <BottomNav />
          </Suspense>
          <Suspense fallback={null}>
            <ScrollReset targetId="app-scroll" />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
