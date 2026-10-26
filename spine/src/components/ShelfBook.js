// A book card: a generated cover showing the course code, the title and
// condition, and room below for whatever the screen needs to say about it.
// `highlight` marks a card that needs the user's attention; `trailing` holds
// anything pinned to the right edge, like a chevron on a tappable card.
export default function ShelfBook({ book, code, highlight, trailing, children }) {
  const [dept, number] = code ? code.split(" ") : [];

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border bg-card px-4 py-3.5 ${
        highlight ? "border-gold" : "border-line"
      }`}
    >
      <span
        aria-hidden
        className="relative flex h-12 w-9 shrink-0 flex-col items-center justify-center rounded-[3px] bg-ink text-[8px] leading-tight font-bold text-paper"
      >
        <span className="absolute inset-x-1 top-1.5 h-px bg-gold" />
        {dept}
        <span>{number}</span>
        <span className="absolute inset-x-1 bottom-1.5 h-px bg-gold" />
      </span>
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="text-sm font-semibold">{book.title}</span>
        <span className="text-xs text-muted">{book.condition}</span>
        {children}
      </span>
      {trailing}
    </div>
  );
}
