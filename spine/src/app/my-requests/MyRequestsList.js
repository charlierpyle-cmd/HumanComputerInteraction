"use client";

import Link from "next/link";
import { useState } from "react";
import { deleteRequest, updateRequest, useRequests } from "@/lib/myRequests";
import { primaryButton, secondaryButton } from "@/lib/styles";

export default function MyRequestsList({ seed }) {
  const requests = useRequests(seed);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Still reading the browser's storage.
  if (!requests) return null;

  return (
    <main className="flex flex-1 flex-col gap-3.5 px-5 pt-6 pb-5">
      {requests.length === 0 && (
        <p role="status" className="text-sm text-muted">
          You have no active “Looking for” requests.
        </p>
      )}

      {requests.map((r) => (
        <div
          key={r.courseId}
          className="flex flex-col gap-2 rounded-lg border border-line bg-card px-4 py-3.5"
        >
          <span className="text-sm font-semibold">
            {r.code} · {r.courseTitle}
          </span>

          {editing === r.courseId ? (
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                updateRequest(seed, r.courseId, {
                  bookTitle: String(data.get("bookTitle") ?? "").trim(),
                  note: String(data.get("note") ?? "").trim(),
                  anyEdition: data.get("anyEdition") === "on",
                });
                setEditing(null);
              }}
            >
              <input
                name="bookTitle"
                defaultValue={r.bookTitle}
                placeholder="Specific book (optional)"
                aria-label="Specific book"
                className="rounded-lg border border-line bg-white px-3.5 py-3 text-[13px] placeholder:text-muted"
              />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="anyEdition" defaultChecked={r.anyEdition} />
                Any edition is fine
              </label>
              <input
                name="note"
                defaultValue={r.note}
                placeholder="Note for sellers"
                aria-label="Note for sellers"
                className="rounded-lg border border-line bg-white px-3.5 py-3 text-[13px] placeholder:text-muted"
              />
              <div className="flex gap-2">
                <button type="submit" className={primaryButton.buying}>
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className={secondaryButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : confirmDelete === r.courseId ? (
            <div role="alertdialog" className="flex flex-col gap-2">
              <span className="text-xs text-muted">
                Delete this request? You’ll stop getting match notifications for{" "}
                {r.code}.
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    deleteRequest(seed, r.courseId);
                    setConfirmDelete(null);
                  }}
                  className={primaryButton.buying}
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(null)}
                  className={secondaryButton}
                >
                  Keep it
                </button>
              </div>
            </div>
          ) : (
            <>
              <span className="text-xs text-muted">
                {r.bookTitle ? `${r.bookTitle} · ` : "Any book · "}
                {r.anyEdition ? "Any edition" : "Course edition only"}
                {r.note ? ` · “${r.note}”` : ""} · {r.daysLeft} days left
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(r.courseId)}
                  className={secondaryButton}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(r.courseId)}
                  className={secondaryButton}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      <Link href="/post" className={`mt-auto ${primaryButton.buying}`}>
        Post a new request
      </Link>
    </main>
  );
}