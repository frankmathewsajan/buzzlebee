'use client';

import { createRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_THRESHOLD = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

export function useSectionNavigation(
  sectionIds,
  {
    initialSection = 'overview',
    observerRootMargin = '-20% 0px -20% 0px',
    observerThreshold = DEFAULT_THRESHOLD,
    minVisibleRatio = 0.3,
    scrollDebounceMs = 100,
  } = {},
) {
  const refsRef = useRef({});
  const [activeSection, setActiveSection] = useState(initialSection);
  const [visibleSection, setVisibleSection] = useState(initialSection);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRefs = useMemo(() => {
    const nextRefs = {};

    sectionIds.forEach((id) => {
      nextRefs[id] = refsRef.current[id] ?? createRef();
    });

    refsRef.current = nextRefs;
    return nextRefs;
  }, [sectionIds]);

  const syncSection = useCallback((sectionId) => {
    setActiveSection((current) => (current === sectionId ? current : sectionId));
    setVisibleSection((current) => (current === sectionId ? current : sectionId));
  }, []);

  const scrollToSection = useCallback(
    (sectionId) => {
      const target = sectionRefs[sectionId]?.current;

      if (!target) {
        return;
      }

      target.scrollIntoView({ behavior: 'smooth' });
      syncSection(sectionId);
    },
    [sectionRefs, syncSection],
  );

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        let nextSection = initialSection;
        let maxVisibility = 0;

        sectionIds.forEach((sectionId) => {
          const element = sectionRefs[sectionId]?.current;

          if (!element) {
            return;
          }

          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const visibleTop = Math.max(0, -rect.top);
          const visibleBottom = Math.min(rect.height, viewportHeight - rect.top);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibility = (visibleHeight / Math.max(1, rect.height)) * 100;

          if (visibility > maxVisibility) {
            maxVisibility = visibility;
            nextSection = sectionId;
          }
        });

        syncSection(nextSection);

        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress = Math.min(100, (window.scrollY / Math.max(1, totalHeight)) * 100);
        setScrollProgress(nextProgress);
      }, scrollDebounceMs);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [initialSection, scrollDebounceMs, sectionIds, sectionRefs, syncSection]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisibleEntry = null;
        let maxVisibilityRatio = 0;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxVisibilityRatio) {
            maxVisibilityRatio = entry.intersectionRatio;
            mostVisibleEntry = entry;
          }
        });

        if (mostVisibleEntry && mostVisibleEntry.intersectionRatio > minVisibleRatio) {
          syncSection(mostVisibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: observerRootMargin,
        threshold: observerThreshold,
      },
    );

    sectionIds.forEach((sectionId) => {
      const element = sectionRefs[sectionId]?.current;

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [minVisibleRatio, observerRootMargin, observerThreshold, sectionIds, sectionRefs, syncSection]);

  return {
    activeSection,
    setActiveSection,
    visibleSection,
    setVisibleSection,
    scrollProgress,
    sectionRefs,
    scrollToSection,
  };
}