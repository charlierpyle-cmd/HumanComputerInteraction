import { getCourse } from "@/lib/courses";

// A book card: a small drawn cover, the title, the course it's for and its
// condition, plus room below for whatever the screen needs to say about it.
// `highlight` marks a card that needs the user's attention; `trailing` holds
// anything pinned to the right edge, like a chevron on a tappable card;
// `interactive` adds the hover look for a card that is itself a link, and
// `showCourse={false}` drops the course line on a screen that's all one course.
export default function ShelfBook({
  book,
  courseId,
  highlight,
  interactive,
  showCourse = true,
  trailing,
  children,
}) {
  const course = getCourse(courseId);
  const [dept, number] = course.code.split(" ");

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border bg-card px-4 py-3.5 ${
        highlight ? "border-gold" : "border-line"
      } ${interactive ? "transition-colors hover:border-ink/50 hover:bg-white" : ""}`}
    >
      <span
        aria-hidden
        className="relative flex h-14 w-10 shrink-0 flex-col items-center justify-center self-start rounded-[3px] bg-ink text-[9px] leading-tight font-bold text-paper"
      >
        <span className="absolute inset-x-1 top-1.5 h-px bg-gold" />
        {dept}
        <span>{number}</span>
        <span className="absolute inset-x-1 bottom-1.5 h-px bg-gold" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-[15px] font-semibold">{book.title}</span>
        {showCourse && (
          <span className="text-[13px]">
            For <span className="font-semibold">{course.code}</span> · {course.title}
          </span>
        )}
        {book.condition && <span className="text-[13px] text-muted">{book.condition}</span>}
        {children}
      </span>
      {trailing}
    </div>
  );
}
