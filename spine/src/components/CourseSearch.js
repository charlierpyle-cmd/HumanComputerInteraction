"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import { courses } from "@/lib/courses";
import { sides } from "@/lib/styles";

// Ignore case and spacing so "stat210" still finds "STAT 210".
const normalize = (text) => text.toLowerCase().replace(/\s+/g, "");

// Shared by Post and Browse. `basePath` is where picking a course goes, `intro`
// says what picking one will do, and `notes` (keyed by course id) adds a short
// status beside a course, like "3 copies".
export default function CourseSearch({ basePath, intro, notes = {} }) {
  const [query, setQuery] = useState("");
  const needle = normalize(query);
  const matches = courses.filter(
    ({ code, title }) =>
      normalize(code).includes(needle) || normalize(title).includes(needle),
  );

  return (
    <main className="flex flex-col gap-3.5 px-5 pt-6 pb-5">
      {intro && <p className="text-sm text-muted">{intro}</p>}
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by course, e.g. STAT 210"
        aria-label="Search courses"
        className="rounded-lg border border-line bg-white px-3.5 py-3 text-sm placeholder:text-muted"
      />
      {matches.map(({ id, code, title }) => (
        <Link
          key={id}
          href={`${basePath}/${id}`}
          className="flex items-center gap-3 rounded-lg border border-line bg-card px-4 py-3.5"
        >
          <span className="flex flex-1 flex-col gap-0.5">
            <span className="text-[15px] font-semibold">{code}</span>
            <span className="text-xs text-muted">{title}</span>
          </span>
          {notes[id] && (
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${sides.buying.tint} ${sides.buying.text}`}
            >
              {notes[id]}
            </span>
          )}
          <Icon name="chevron" className="size-4 text-muted" />
        </Link>
      ))}
      {matches.length === 0 && (
        <p className="text-sm text-muted">No courses match “{query}”.</p>
      )}
    </main>
  );
}
