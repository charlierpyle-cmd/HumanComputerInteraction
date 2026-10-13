import Link from "next/link";

const tabs = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/post", label: "Post" },
  { href: "/shelf", label: "Shelf" },
];

export default function BottomNav() {
  return (
    <nav className="sticky bottom-0 grid h-16 grid-cols-4 bg-white">
      {tabs.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center justify-center gap-1.5 text-[11px] font-medium"
        >
          <span className="size-[5px] rounded-full bg-accent" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
