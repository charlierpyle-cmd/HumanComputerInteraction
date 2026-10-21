import Link from "next/link";

// Tags which side of a trade a screen belongs to, so buying and selling flows
// look distinct at a glance.
const sideBadges = {
  buying: { label: "BUYING", className: "bg-buying" },
  selling: { label: "SELLING", className: "bg-selling" },
};

export default function ScreenHeader({ title, backHref, side }) {
  const badge = sideBadges[side];

  return (
    <header className="flex h-16 items-center gap-2 bg-ink px-5 text-white">
      {backHref && (
        <Link
          href={backHref}
          aria-label="Back"
          className="flex size-8 items-center justify-center rounded-md text-xl"
        >
          ←
        </Link>
      )}
      <h1 className="text-lg font-semibold">{title}</h1>
      {badge && (
        <span
          className={`ml-auto rounded-[10px] px-2 py-1 text-[9px] font-bold ${badge.className}`}
        >
          {badge.label}
        </span>
      )}
    </header>
  );
}
