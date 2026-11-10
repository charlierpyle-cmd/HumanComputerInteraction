"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import { courses } from "@/lib/courses";
import { cardLink, fieldInput } from "@/lib/styles";

// Ignore case and spacing so "stat218" still finds "STAT 218".
const normalize = (text) => text.toLowerCase().replace(/\s+/g, "");

// Bolds the part of `text` the student typed, when it appears as typed.
function Match({ text, query }) {
  const start = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (start < 0) return text;
  const end = start + query.length;
  return (
    <>
      {text.slice(0, start)}
      <mark className="bg-transparent font-bold text-inherit">{text.slice(start, end)}</mark>
      {text.slice(end)}
    </>
  );
}

// Shared by Request and Browse. The search box comes first and narrows the
// list as you type, by course code, course name or the course's book.
// `basePath` is where picking a course goes, and `notes` (keyed by course id)
// adds a short status beside a course, like "3 copies".
export default function CourseSearch({ basePath, notes = {} }) {
  const [query, setQuery] = useState("");
  const typed = query.trim();
  const needle = normalize(query);
  const results = courses
    .map((course) => ({
      course,
      byBook:
        needle !== "" &&
        !normalize(`${course.code}${course.title}`).includes(needle) &&
        course.requiredBook !== null &&
        normalize(course.requiredBook.title).includes(needle),
    }))
    .filter(
      ({ course, byBook }) =>
        byBook || normalize(`${course.code} ${course.title}`).includes(needle),
    );

  return (
    <main className="flex flex-col gap-3 px-5 pt-5 pb-5">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by course or book, e.g. STAT 218"
        aria-label="Search courses"
        className={fieldInput}
      />
      <p role="status" className="sr-only">
        {results.length === 1 ? "1 course" : `${results.length} courses`}
      </p>
      {results.map(({ course: { id, code, title, requiredBook }, byBook }) => (
        <Link
          key={id}
          href={`${basePath}/${id}`}
          className={`flex items-center gap-3 px-4 py-3 ${cardLink}`}
        >
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-base font-semibold">
              <Match text={code} query={typed} />
            </span>
            <span className="text-[13px] text-muted">
              <Match text={title} query={typed} />
            </span>
            {byBook && (
              <span className="text-[13px]">
                Book: <Match text={requiredBook.title} query={typed} />
              </span>
            )}
          </span>
          {notes[id] && (
            <span className="shrink-0 text-[13px] font-semibold text-buying">{notes[id]}</span>
          )}
          <Icon name="chevron" className="size-4 text-muted" />
        </Link>
      ))}
      {results.length === 0 && (
        <div className="flex flex-col items-start gap-1 text-sm text-muted">
          <p>
            No courses match “{query}”. Try the course code, like STAT 218.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="min-h-11 font-semibold text-ink underline underline-offset-2 hover:decoration-2"
          >
            Clear search
          </button>
        </div>
      )}
    </main>
  );
}
