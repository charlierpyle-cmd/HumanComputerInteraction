"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

// The phone frame scrolls on its own, so the browser can't reset it between
// screens. Every new screen starts at the top, the way an app's would.
export default function ScrollReset({ targetId }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    document.getElementById(targetId)?.scrollTo(0, 0);
  }, [pathname, targetId]);

  return null;
}
