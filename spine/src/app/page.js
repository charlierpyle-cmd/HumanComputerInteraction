"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { useMatches } from "@/lib/matchState";
import { useNotifications } from "@/lib/notifications";
import { sides } from "@/lib/styles";

export default function Home() {
  const notifications = useNotifications();
  const requests = useMatches().filter(({ status }) => status === "open").length;

  // Same order as the bottom bar, split by which side of a trade you're on.
  const groups = [
    {
      side: "buying",
      heading: "I need a book",
      entries: [
        {
          href: "/browse",
          icon: "search",
          title: "Browse available copies",
          subtitle: "See what students are selling for your courses.",
        },
        {
          href: "/post",
          icon: "post",
          title: "Request a book",
          subtitle: "Join a course waitlist before you buy new.",
        },
      ],
    },
    {
      side: "selling",
      heading: "I have a book",
      entries: [
        {
          href: "/shelf",
          icon: "shelf",
          title: "My Shelf",
          subtitle: "Sell books you're done with.",
          badge: requests > 0 && `${requests} request${requests > 1 ? "s" : ""}`,
        },
      ],
    },
  ];

  return (
    <>
      <header className="flex h-[72px] shrink-0 items-center gap-3 bg-ink px-5 text-white">
        <Link href="/" className="flex items-center gap-1.5 text-xl font-bold">
          <Icon name="logo" className="size-6 text-gold" />
          Spine
        </Link>
        <Link
          href="/notifications"
          aria-label={`Notifications (${notifications.length} new)`}
          className="relative ml-auto flex size-10 items-center justify-center rounded-md hover:bg-white/10"
        >
          <Icon name="bell" />
          {notifications.length > 0 && (
            <span
              aria-hidden
              className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold"
            >
              {notifications.length}
            </span>
          )}
        </Link>
      </header>

      <main className="flex flex-col gap-6 px-5 pt-6 pb-5">
        {notifications.length > 0 && (
          <Link
            href="/notifications"
            className="flex items-center gap-3 rounded-lg border border-gold bg-card px-4 py-3"
          >
            <Icon name="bell" className="size-5 text-gold" />
            <span className="flex flex-1 flex-col gap-0.5 text-[13px]">
              {notifications.map(({ id, title }) => (
                <span key={id}>{title}</span>
              ))}
            </span>
            <Icon name="chevron" className="size-4 text-muted" />
          </Link>
        )}

        {groups.map(({ side, heading, entries }) => (
          <section key={side} className="flex flex-col gap-2.5">
            <h2 className={`text-xs font-bold tracking-wide uppercase ${sides[side].text}`}>
              {heading}
            </h2>
            {entries.map(({ href, icon, title, subtitle, badge }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-lg border border-line bg-card p-4"
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-md ${sides[side].tint} ${sides[side].text}`}
                >
                  <Icon name={icon} />
                </span>
                <span className="flex flex-1 flex-col gap-0.5">
                  <span className="font-semibold">{title}</span>
                  <span className="text-xs text-muted">{subtitle}</span>
                </span>
                {badge && (
                  <span className="shrink-0 rounded-full bg-gold px-2 py-0.5 text-[11px] font-bold text-white">
                    {badge}
                  </span>
                )}
                <Icon name="chevron" className="size-4 text-muted" />
              </Link>
            ))}
          </section>
        ))}
      </main>
    </>
  );
}
