"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import RequestFields, { readRequestFields } from "@/components/RequestFields";
import { getCourse } from "@/lib/courses";
import { deleteRequest, updateRequest, useRequests } from "@/lib/myRequests";
import { describeRequest } from "@/lib/requestOptions";
import { card, dangerButton, primaryButton, secondaryButton } from "@/lib/styles";

export default function MyRequestsList() {
  const requests = useRequests();
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // An open editor or "are you sure?" is a passing state: leaving the screen
  // closes it, so coming back shows the plain list.
  useLayoutEffect(
    () => () => {
      setEditing(null);
      setConfirmDelete(null);
    },
    [],
  );

  return (
    <main className="flex flex-1 flex-col gap-3 px-5 pt-5 pb-5">
      {requests.length === 0 && (
        <p role="status" className="text-[15px] text-muted">
          You have no active requests.
        </p>
      )}

      {requests.map((r) => (
        <div key={r.courseId} className={`flex flex-col gap-3 px-4 py-3.5 ${card}`}>
          <span className="text-base font-semibold">
            {r.code} · {r.courseTitle}
          </span>

          {editing === r.courseId ? (
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                updateRequest(r.courseId, readRequestFields(e.currentTarget));
                setEditing(null);
              }}
            >
              <RequestFields course={getCourse(r.courseId)} request={r} />
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
            <div role="alertdialog" aria-label={`Delete ${r.code} request`} className="flex flex-col gap-3">
              <span className="text-[15px]">
                Delete this request? You’ll stop getting matched with {r.code}{" "}
                sellers.
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    deleteRequest(r.courseId);
                    setConfirmDelete(null);
                  }}
                  className={dangerButton}
                >
                  Delete
                </button>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setConfirmDelete(null)}
                  className={secondaryButton}
                >
                  Keep it
                </button>
              </div>
            </div>
          ) : (
            <>
              <span className="-mt-2 text-sm text-muted">
                {describeRequest(r)}
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
