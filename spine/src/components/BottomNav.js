"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";

// Same names and icons as the Home cards they lead to.
const tabs = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/browse", label: "Browse", icon: "search" },
  { href: "/post", label: "Request", icon: "megaphone" },
  { href: "/shelf", label: "My Books", icon: "tag" },
];

// Screens that aren't a tab of their own keep the tab you reach them from lit.
const parentTab = { matches: "/shelf", notifications: "/", "my-requests": "/post" };

function tabFor(pathname) {
  const section = pathname.split("/")[1];
  return parentTab[section] ?? `/${section}`;
}

// The bar itself. With no `pathname` it doubles as the placeholder shown
// while the current path is still unknown.
export function NavBar({ pathname }) {
  const active = pathname && tabFor(pathname);

  return (
    <nav className="grid h-16 shrink-0 grid-cols-4 border-t border-line bg-white">
      {tabs.map(({ href, label, icon }) => {
        const isActive = href === active;
        // "page" only on the tab's own screen; a screen under it gets "true".
        const current = href === pathname ? "page" : isActive ? "true" : undefined;
        return (
          <Link
            key={href}
            href={href}
            aria-current={current}
            className={`relative flex flex-col items-center justify-center gap-1 text-xs transition-colors hover:bg-ink/5 hover:text-ink ${
              isActive ? "font-semibold text-ink" : "font-medium text-muted"
            }`}
          >
            {isActive && (
              <span className="absolute inset-x-5 top-0 h-[3px] rounded-b-full bg-accent" />
            )}
            <Icon name={icon} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function BottomNav() {
  return <NavBar pathname={usePathname()} />;
}
