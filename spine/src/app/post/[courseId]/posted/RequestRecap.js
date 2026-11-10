"use client";

import { useRequests } from "@/lib/myRequests";
import { describeRequest } from "@/lib/requestOptions";

// The confirmation's summary, then what the request asks for and the note
// sellers will see, so the student can check it. With no request this visit,
// as after a reload, it's just the summary.
export default function RequestRecap({ courseId, summary }) {
  const request = useRequests().find((r) => r.courseId === courseId);

  return (
    <>
      {summary}
      {request && <span className="mt-1.5 block">{describeRequest(request)}</span>}
      {request?.note && (
        <span className="mt-1 block text-muted">Your note: “{request.note}”</span>
      )}
    </>
  );
}
