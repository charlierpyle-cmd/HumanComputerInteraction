import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import BottomNav, { NavBar } from "@/components/BottomNav";
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
  title: "spine",
  description: "Buy and sell used course textbooks.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-paper text-ink">
          <div className="flex flex-1 flex-col">{children}</div>
          {/* The current path isn't known while prerendering some routes. */}
          <Suspense fallback={<NavBar />}>
            <BottomNav />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
