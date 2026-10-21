"use client";

import Link from "next/link";
import { useState } from "react";
import { courses } from "@/lib/courses";

// Ignore case and spacing so "stat210" still finds "STAT 210".
const normalize = (text) => text.toLowerCase().replace(/\s+/g, "");

export default function CourseSearch({ basePath = "/post" }) {
  const [query, setQuery] = useState("");
  const needle = normalize(query);
  const matches = courses.filter(
    ({ code, title }) =>
      normalize(code).includes(needle) || normalize(title).includes(needle),
  );

  return (
    <main className="flex flex-col gap-3.5 px-5 pt-6 pb-5">
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
          href={`/post/${id}`}
          className="flex flex-col gap-0.5 rounded-lg border border-line bg-card px-4 py-3.5"
        >
          <span className="text-[15px] font-semibold">{code}</span>
          <span className="text-xs text-muted">{title}</span>
        </Link>
      ))}
      {matches.length === 0 && (
        <p className="text-sm text-muted">No courses match “{query}”.</p>
      )}
    </main>
  );
}
