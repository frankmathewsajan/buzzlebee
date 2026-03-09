'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const VISITED_PAGES_KEY = 'portfolioVisitedPages';
const PAGE_SCROLL_PROGRESS_KEY = 'portfolioPageScrollProgress';

const getInitialVisitedPages = () => {
  if (typeof window === 'undefined') {
    return new Set(['/']);
  }

  const saved = localStorage.getItem(VISITED_PAGES_KEY);
  return saved ? new Set(JSON.parse(saved)) : new Set(['/']);
};

const getInitialPageScrollProgress = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  const saved = localStorage.getItem(PAGE_SCROLL_PROGRESS_KEY);
  return saved ? JSON.parse(saved) : {};
};

export default function usePortfolioTracker(pathname) {
  const scrollSaveTimeoutRef = useRef(null);
  const [visitedPages, setVisitedPages] = useState(getInitialVisitedPages);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pageScrollProgress, setPageScrollProgress] = useState(getInitialPageScrollProgress);

  const effectiveVisitedPages = useMemo(() => {
    const next = new Set(visitedPages);
    next.add(pathname);
    return next;
  }, [pathname, visitedPages]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(VISITED_PAGES_KEY, JSON.stringify([...effectiveVisitedPages]));
  }, [effectiveVisitedPages]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalHeight > 0 ? Math.min(100, (currentScroll / totalHeight) * 100) : 0;

      setScrollProgress(progress);
      setPageScrollProgress((prev) => ({
        ...prev,
        [pathname]: Math.round(progress)
      }));
    };

    const initialScrollTimeout = window.setTimeout(handleScroll, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(initialScrollTimeout);
      window.removeEventListener('scroll', handleScroll);

      if (scrollSaveTimeoutRef.current) {
        clearTimeout(scrollSaveTimeoutRef.current);
      }
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (scrollSaveTimeoutRef.current) {
      clearTimeout(scrollSaveTimeoutRef.current);
    }

    scrollSaveTimeoutRef.current = window.setTimeout(() => {
      localStorage.setItem(PAGE_SCROLL_PROGRESS_KEY, JSON.stringify(pageScrollProgress));
    }, 100);

    return () => {
      if (scrollSaveTimeoutRef.current) {
        clearTimeout(scrollSaveTimeoutRef.current);
      }
    };
  }, [pageScrollProgress]);

  const clearProgress = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(VISITED_PAGES_KEY);
      localStorage.removeItem(PAGE_SCROLL_PROGRESS_KEY);
    }

    setVisitedPages(new Set([pathname]));
    setPageScrollProgress({});
    setScrollProgress(0);
  };

  return {
    visitedPages: effectiveVisitedPages,
    setVisitedPages,
    scrollProgress,
    setScrollProgress,
    pageScrollProgress,
    setPageScrollProgress,
    clearProgress
  };
}