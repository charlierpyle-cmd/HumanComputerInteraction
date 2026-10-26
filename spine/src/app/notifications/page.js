import Link from "next/link";
import Icon from "@/components/Icon";
import ScreenHeader from "@/components/ScreenHeader";
import { getNotifications } from "@/lib/notifications";
import { sides } from "@/lib/styles";

export default function NotificationsPage() {
  const notifications = getNotifications();

  return (
    <>
      <ScreenHeader title="Notifications" backHref="/" />
      <main className="flex flex-col gap-3.5 px-5 pt-6 pb-5">
        {notifications.length === 0 && (
          <p className="text-sm text-muted">You’re all caught up.</p>
        )}
        {notifications.map(({ id, side, href, title, detail }) => (
          <Link
            key={id}
            href={href}
            className="flex items-center gap-3 rounded-lg border border-line bg-card px-4 py-3.5"
          >
            <span className="flex flex-1 flex-col items-start gap-1">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase ${sides[side].bg}`}
              >
                {sides[side].label}
              </span>
              <span className="text-sm font-semibold">{title}</span>
              <span className="text-xs text-muted">{detail}</span>
            </span>
            <Icon name="chevron" className="size-4 text-muted" />
          </Link>
        ))}
      </main>
    </>
  );
}
