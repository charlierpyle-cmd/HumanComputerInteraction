"use client";

import Link from "next/link";
import { useEffect } from "react";
import Icon from "@/components/Icon";
import ScreenHeader from "@/components/ScreenHeader";
import { markAllSeen, useNotifications } from "@/lib/notifications";
import { cardLink, sides } from "@/lib/styles";

export default function NotificationsPage() {
  const notifications = useNotifications();

  // Seeing the list is checking it: the bell's count clears. Runs each time
  // this screen is shown, including after Next brings a kept page back.
  useEffect(() => {
    markAllSeen(notifications.filter((n) => n.unread).map((n) => n.id));
  }, [notifications]);

  return (
    <>
      <ScreenHeader title="Notifications" backHref="/" />
      <main className="flex flex-col gap-3 px-5 pt-5 pb-5">
        {notifications.length === 0 && (
          <p className="text-[15px] text-muted">You’re all caught up.</p>
        )}
        {notifications.map(({ id, side, href, title, detail }) => (
          <Link
            key={id}
            href={href}
            className={`flex items-center gap-3 px-4 py-3.5 ${cardLink}`}
          >
            <span className="flex flex-1 flex-col items-start gap-0.5">
              <span className={`text-xs font-bold tracking-wide uppercase ${sides[side].text}`}>
                {sides[side].label}
              </span>
              <span className="text-[15px] font-semibold">{title}</span>
              <span className="text-[13px] text-muted">{detail}</span>
            </span>
            <Icon name="chevron" className="size-4 text-muted" />
          </Link>
        ))}
      </main>
    </>
  );
}
