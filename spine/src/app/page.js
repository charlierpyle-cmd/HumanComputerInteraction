import Link from "next/link";

const entries = [
  {
    href: "/post",
    title: "Post what you need",
    subtitle: "Let sellers know before you buy new.",
  },
  {
    href: "/browse",
    title: "Browse available copies",
    subtitle: "See what's listed for your courses.",
  },
  {
    href: "/shelf",
    title: "My Shelf",
    subtitle: "Manage books you're done with.",
    badge: 1,
  },
];

export default function Home() {
  return (
    <>
      <header className="flex h-[72px] items-center justify-between bg-ink px-5 text-white">
        <span className="text-xl font-bold">spine</span>
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="flex size-8 items-center justify-center rounded-md bg-gold"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-[18px]"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </Link>
        <span className="flex size-8 items-center justify-center rounded-md bg-gold font-bold">
          C
        </span>
      </header>

      <main className="flex flex-col gap-4 px-5 pt-7">
        {entries.map(({ href, title, subtitle, badge }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center justify-between rounded-md border border-ink/15 bg-card p-[19px]"
          >
            <span className="flex flex-col gap-1">
              <span className="font-semibold">{title}</span>
              <span className="text-xs text-ink/60">{subtitle}</span>
            </span>
            {badge && (
              <span className="rounded-md bg-gold px-1.5 py-1 text-[11px] font-bold text-white">
                {badge}
              </span>
            )}
          </Link>
        ))}
      </main>
    </>
  );
}
