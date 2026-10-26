import Link from "next/link";
import { sides } from "@/lib/styles";

// Tags which side of a trade a screen belongs to, so buying and selling flows
// look distinct at a glance. `step` (e.g. "2 of 3") shows how far along a task
// the user is.
export default function ScreenHeader({ title, backHref, side, step }) {
  const theme = sides[side];

  return (
    <header
      className={`flex h-16 shrink-0 items-center gap-2 bg-ink px-5 text-white ${
        theme ? `border-b-4 ${theme.border}` : ""
      }`}
    >
      {backHref && (
        <Link
          href={backHref}
          aria-label="Back"
          className="-ml-2 flex size-10 items-center justify-center rounded-md text-xl hover:bg-white/10"
        >
          ←
        </Link>
      )}
      <div className="flex flex-col">
        <h1 className="text-lg leading-tight font-semibold">{title}</h1>
        {step && <span className="text-[11px] text-white/70">Step {step}</span>}
      </div>
      {theme && (
        <span
          className={`ml-auto rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${theme.bg}`}
        >
          {theme.label}
        </span>
      )}
    </header>
  );
}
