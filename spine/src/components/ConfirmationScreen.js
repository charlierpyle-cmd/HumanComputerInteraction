import Link from "next/link";
import ScreenHeader from "@/components/ScreenHeader";

// The end of every task: a checkmark, what just happened, and a way home.
export default function ConfirmationScreen({ title, side, recap, children }) {
  return (
    <>
      <ScreenHeader title={title} side={side} />
      <main className="flex flex-col items-center gap-4 px-5 pt-20 text-center">
        <span
          aria-hidden
          className="flex size-[72px] items-center justify-center rounded-full bg-gold text-[32px] font-bold text-white"
        >
          ✓
        </span>
        <h2 className="text-[22px] font-semibold">{title}</h2>
        <p className="max-w-[280px] text-[13px] leading-4 text-muted">
          {children}
        </p>
        <p className="rounded-lg border border-line bg-card px-4 py-3 text-xs">
          {recap}
        </p>
        <Link
          href="/"
          className="w-full rounded-lg bg-gold py-[15px] text-[15px] font-semibold text-white"
        >
          Back to Home
        </Link>
      </main>
    </>
  );
}
