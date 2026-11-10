"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { useMatches } from "@/lib/matchState";
import { useNotifications } from "@/lib/notifications";
import { cardLink, sectionHeading, sides } from "@/lib/styles";

export default function Home() {
  const notifications = useNotifications();
  const unread = notifications.filter((n) => n.unread);
  const wanted = useMatches().filter(({ status }) => status === "open").length;

  // Same order as the bottom bar, split by which side of a trade you're on.
  // Each card has the same name and icon as its tab.
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
          icon: "megaphone",
          title: "Request a book",
          subtitle: "Nobody selling yours? We’ll tell you when someone is.",
        },
      ],
    },
    {
      side: "selling",
      heading: "I have a book",
      entries: [
        {
          href: "/shelf",
          icon: "tag",
          title: "My Books",
          subtitle: "Sell books you’re done with.",
          status:
            wanted > 0 &&
            `${wanted} student${wanted > 1 ? "s want" : " wants"} your books`,
        },
      ],
    },
  ];

  return (
    <>
      <header className="on-dark sticky top-0 z-10 flex h-16 shrink-0 items-center gap-3 bg-ink px-4 text-white">
        <Link href="/" className="flex items-center gap-1.5 text-xl font-bold">
          <Icon name="logo" className="size-6 text-gold" />
          Spine
        </Link>
        <Link
          href="/notifications"
          aria-label={
            unread.length > 0 ? `Notifications, ${unread.length} new` : "Notifications"
          }
          className="relative ml-auto flex size-11 items-center justify-center rounded-md transition-colors hover:bg-white/15"
        >
          <Icon name="bell" className="size-6" />
          {unread.length > 0 && (
            <span
              aria-hidden
              className="absolute top-1 right-1 flex size-[18px] items-center justify-center rounded-full bg-danger text-xs font-bold"
            >
              {unread.length}
            </span>
          )}
        </Link>
      </header>

      <main className="flex flex-1 flex-col gap-7 px-5 pt-6 pb-5">
        {groups.map(({ side, heading, entries }) => (
          <section key={side} className="flex flex-col gap-3">
            <h2 className={`${sectionHeading} ${sides[side].heading}`}>{heading}</h2>
            {entries.map(({ href, icon, title, subtitle, status }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3.5 p-4 ${cardLink}`}
              >
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-md ${sides[side].tint} ${sides[side].text}`}
                >
                  <Icon name={icon} className="size-6" />
                </span>
                <span className="flex flex-1 flex-col gap-0.5">
                  <span className="text-[17px] font-semibold">{title}</span>
                  <span className="text-sm text-muted">{subtitle}</span>
                  {status && (
                    <span className="text-sm font-semibold text-gold-ink">{status}</span>
                  )}
                </span>
                <Icon name="chevron" className="size-5 text-muted" />
              </Link>
            ))}
          </section>
        ))}
      </main>
    </>
  );
}
