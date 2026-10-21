// A book on the seller's shelf: cover, title and condition, with room below
// for whatever the screen needs to say about it.
export default function ShelfBook({ book, children }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-card px-4 py-3.5">
      <span aria-hidden className="h-11 w-8 shrink-0 rounded-[3px] bg-ink" />
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold">{book.title}</span>
        <span className="text-xs text-muted">{book.condition}</span>
        {children}
      </span>
    </div>
  );
}
