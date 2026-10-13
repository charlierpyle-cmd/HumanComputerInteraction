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
          aria-label="Notifications (1 new)"
          className="rounded-md bg-gold px-2 py-1.5 text-xs font-bold"
        >
          1
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
