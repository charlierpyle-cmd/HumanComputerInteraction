import Link from "next/link";
import Icon from "@/components/Icon";
import { sides } from "@/lib/styles";

// Tags which side of a trade a screen belongs to, so buying and selling flows
// look distinct at a glance: a colored stripe plus the word, as plain text
// rather than a button-like pill. `step` (e.g. "2 of 3") shows how far along a
// task the user is.
export default function ScreenHeader({ title, backHref, side, step }) {
  const theme = sides[side];

  return (
    <header
      className={`on-dark sticky top-0 z-10 flex h-16 shrink-0 items-center gap-1.5 bg-ink px-4 text-white ${
        theme ? `border-b-4 ${theme.border}` : ""
      }`}
    >
      {backHref && (
        <Link
          href={backHref}
          aria-label="Back"
          className="-ml-1.5 flex size-11 items-center justify-center rounded-md transition-colors hover:bg-white/15"
        >
          <Icon name="back" className="size-6" />
        </Link>
      )}
      <div className="flex min-w-0 flex-col">
        <h1 className="truncate text-xl leading-tight font-semibold">{title}</h1>
        {step && <span className="text-xs text-white/75">Step {step}</span>}
      </div>
      {theme && (
        <span
          className={`ml-auto shrink-0 pl-2 text-xs font-semibold tracking-wide uppercase ${theme.onDark}`}
        >
          {theme.label}
        </span>
      )}
    </header>
  );
}
