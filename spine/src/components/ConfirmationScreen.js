import Link from "next/link";
import ScreenHeader from "@/components/ScreenHeader";
import { primaryButton, sides } from "@/lib/styles";

// The end of every task: a checkmark, what just happened, and a way home.
export default function ConfirmationScreen({ title, side, recap, children }) {
  return (
    <>
      <ScreenHeader title={title} side={side} />
      <main className="flex flex-col items-center gap-4 px-5 pt-20 pb-5 text-center">
        <span
          aria-hidden
          className={`flex size-[72px] items-center justify-center rounded-full text-[32px] font-bold text-white ${sides[side].bg}`}
        >
          ✓
        </span>
        <h2 className="text-[22px] font-semibold">{title}</h2>
        <p className="max-w-[280px] text-[13px] leading-5 text-muted">
          {children}
        </p>
        <p className="rounded-lg border border-line bg-card px-4 py-3 text-xs">
          {recap}
        </p>
        <Link href="/" className={primaryButton[side]}>
          Back to Home
        </Link>
      </main>
    </>
  );
}
