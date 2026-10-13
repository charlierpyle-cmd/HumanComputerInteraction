import Link from "next/link";

// Stand-in for screens that aren't built yet: a header with a way back home.
export default function PlaceholderScreen({ title }) {
  return (
    <>
      <header className="flex h-16 items-center gap-2 bg-ink px-5 text-white">
        <Link
          href="/"
          aria-label="Back to Home"
          className="flex size-8 items-center justify-center rounded-md text-xl"
        >
          ←
        </Link>
        <h1 className="text-lg font-bold">{title}</h1>
      </header>
      <main className="flex-1" />
    </>
  );
}
