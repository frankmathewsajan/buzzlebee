"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analytics } from "../../lib/firebase";
import { logEvent } from "firebase/analytics";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (analytics && pathname) {
      // Track page views
      logEvent(analytics, "page_view", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}