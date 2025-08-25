'use client';

import { useState, useEffect, useCallback } from 'react';

export const useScrollAndVisibility = (sectionRefs) => {
  const [viewState, setViewState] = useState({
    sectionVisibility: { home: true, about: false, projects: false, contact: false },
    projectsOpacity: 0,
    contactOpacity: 0
  });

  // Scroll handler
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    const aboutSection = document.getElementById('about');
    const contactSection = document.getElementById('contact');
    
    if (!aboutSection || !contactSection) return;

    const aboutOffsetTop = aboutSection.offsetTop;
    const aboutHeight = aboutSection.offsetHeight;
    const aboutMiddle = aboutOffsetTop + (aboutHeight / 2);
    const contactQuarterTrigger = contactSection.offsetTop - (windowHeight * 0.75);
    
    let newProjectsOpacity = 0;
    let newContactOpacity = 0;
    
    if (scrollY >= aboutMiddle && scrollY < contactQuarterTrigger) {
      newProjectsOpacity = 1;
    } else if (scrollY >= contactQuarterTrigger) {
      newContactOpacity = 1;
    }
    
    setViewState(prev => {
      if (prev.projectsOpacity !== newProjectsOpacity || prev.contactOpacity !== newContactOpacity) {
        return {
          ...prev,
          projectsOpacity: newProjectsOpacity,
          contactOpacity: newContactOpacity
        };
      }
      return prev;
    });
  }, []);

  // Intersection observer callback
  const handleIntersection = useCallback((entries) => {
    const updates = {};
    entries.forEach((entry) => {
      const sectionId = entry.target.id;
      const isVisible = entry.intersectionRatio >= 0.5;
      updates[sectionId] = isVisible;
    });
    
    setViewState(prev => ({
      ...prev,
      sectionVisibility: { ...prev.sectionVisibility, ...updates }
    }));
  }, []);

  // Throttled scroll listener
  useEffect(() => {
    let timeoutId = null;
    const throttledScroll = () => {
      if (timeoutId) return;
      timeoutId = requestAnimationFrame(() => {
        handleScroll();
        timeoutId = null;
      });
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) cancelAnimationFrame(timeoutId);
    };
  }, [handleScroll]);

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.5],
      rootMargin: '0px'
    });

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [handleIntersection, sectionRefs]);

  // Scroll position management
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('indexScrollPosition', window.scrollY.toString());
    };

    const restoreScrollPosition = () => {
      const savedPosition = localStorage.getItem('indexScrollPosition');
      if (savedPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition));
          localStorage.removeItem('indexScrollPosition');
        }, 100);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    restoreScrollPosition();

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return viewState;
};
