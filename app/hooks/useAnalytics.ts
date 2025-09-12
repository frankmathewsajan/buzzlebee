import { useEffect } from "react";
import { analytics } from "../../lib/firebase";
import { logEvent } from "firebase/analytics";

export const useAnalytics = () => {
  useEffect(() => {
    // Analytics is already initialized in firebase.ts
    // This hook can be used to track page views or custom events
  }, []);

  const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
    }
  };

  const trackPageView = (pageName: string) => {
    if (analytics) {
      logEvent(analytics, "page_view", {
        page_title: pageName,
        page_location: window.location.href,
      });
    }
  };

  return {
    trackEvent,
    trackPageView,
  };
};