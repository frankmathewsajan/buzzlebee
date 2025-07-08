# Navigation Progress Bar - Saved Code

This file contains the complete code for the bottom navigation progress bar that was removed from the main page. It includes the CustomGauge component, NavigationMenu component, and all related functionality.

## CustomGauge Component

```javascript
const CustomGauge = memo(({ value, size = "small", currentSection }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-10 h-10",
    large: "w-12 h-12"
  };

  const colors = {
    '0': '#ffffff',    // white
    '10': '#e0f2fe',   // sky-100
    '20': '#bae6fd',   // sky-200
    '30': '#7dd3fc',   // sky-300
    '40': '#38bdf8',   // sky-400
    '50': '#f0fdf4',   // green-50
    '60': '#dcfce7',   // green-100
    '70': '#bbf7d0',   // green-200
    '80': '#86efac',   // green-300
    '90': '#4ade80',   // green-400
    '100': '#fecaca'   // red-200
  };

  const getColor = (value) => {
    const thresholds = Object.keys(colors).map(Number).sort((a, b) => a - b);
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (value >= thresholds[i]) {
        return colors[thresholds[i]];
      }
    }
    return colors['0'];
  };

  // Calculate the total progress including subsection progress
  const totalProgress = value;

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <svg className="w-full h-full" viewBox="0 0 24 24">
        {/* Background circle */}
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke={getColor(0)}
          strokeWidth="1.5"
          className="opacity-20"
        />
        {/* Progress circle */}
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke={getColor(totalProgress)}
          strokeWidth="1"
          strokeDasharray={`${(totalProgress / 100) * 62.83} 62.83`}
          transform="rotate(-90 12 12)"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-base font-medium text-white">
        {currentSection}
      </span>
    </div>
  );
});

CustomGauge.displayName = 'CustomGauge';
```

## NavigationMenu Component

```javascript
const NavigationMenu = memo(({ showNavMenu, setShowNavMenu, sections, activeSection }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowNavMenu(false);
      }
    };

    if (showNavMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNavMenu, setShowNavMenu]);

  return (
    showNavMenu && (
      <div ref={menuRef} className="fixed bottom-24 right-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden w-64 z-50 border border-gray-100">
        <div className="py-2">
          {/* Back to Top Button */}
          <button
            onClick={() => {
              setShowNavMenu(false);
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 300);
            }}
            className="w-full px-6 py-2 text-left hover:bg-gray-50/80 transition-all duration-300 flex items-center gap-3 group border-b border-gray-100"
          >
            <span className="text-xs text-gray-500 group-hover:text-gray-900 transition-colors duration-300">
              Back to Top
            </span>
          </button>

          {/* Section List */}
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => {
                setShowNavMenu(false);
                setTimeout(() => {
                  section.ref.current?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }}
              className={`w-full px-6 py-3 text-left hover:bg-gray-50/80 transition-all duration-300 flex items-center justify-between group ${activeSection === section.id ? 'bg-gray-50/80 font-medium' : ''
                }`}
            >
              <span className={`text-sm transition-colors duration-300 ${activeSection === section.id ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
                }`}>
                {index + 1}. {section.label}
              </span>
              {activeSection === section.id && (
                <CheckCircle className="w-4 h-4 text-gray-900" />
              )}
            </button>
          ))}

          {/* Additional Links */}
          <div className="border-t border-gray-100">
            <Link
              href="/projects"
              onClick={() => setShowNavMenu(false)}
              className="w-full px-6 py-3 text-left hover:bg-gray-50/80 transition-all duration-300 flex items-center justify-between group"
            >
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                Projects
              </span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
            <Link
              href="/case-studies"
              onClick={() => setShowNavMenu(false)}
              className="w-full px-6 py-3 text-left hover:bg-gray-50/80 transition-all duration-300 flex items-center justify-between group"
            >
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                Case Studies
              </span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </Link>
            <Link
              href="/about"
              onClick={() => setShowNavMenu(false)}
              className="w-full px-6 py-3 text-left hover:bg-gray-50/80 transition-all duration-300 flex items-center justify-between group"
            >
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                Education & Experience
              </span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
            <Link
              href="/certifications"
              onClick={() => setShowNavMenu(false)}
              className="w-full px-6 py-3 text-left hover:bg-gray-50/80 transition-all duration-300 flex items-center justify-between group"
            >
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                Certifications
              </span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </Link>
            <Link
              href="/blogs"
              onClick={() => setShowNavMenu(false)}
              className="w-full px-6 py-3 text-left hover:bg-gray-50/80 transition-all duration-300 flex items-center justify-between group"
            >
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                Blog
              </span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    )
  );
});

NavigationMenu.displayName = 'NavigationMenu';
```

## Fixed Navigation Bar HTML

```javascript
{/* Fixed Navigation */}
<div className="fixed z-50 bottom-8 right-8">
  <button
    onClick={() => setShowNavMenu(prev => !prev)}
    className="bg-gray-900/80 backdrop-blur-sm text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-gray-800/90 transition-all duration-300 flex items-center gap-1 w-[240px] pointer-events-auto"
  >
    <div className="flex-shrink-0 -ml-1">
      <CustomGauge
        value={scrollProgress}
        size="small"
        currentSection={sections.findIndex(s => s.id === activeSection) + 1}
      />
    </div>
    <span className="text-base w-[140px] text-center transition-all duration-500 ease-in-out truncate">
      {sections.find(s => s.id === activeSection)?.label}
    </span>
    {showNavMenu ? (
      <ArrowDownCircle className="w-5 h-5 flex-shrink-0 transition-transform duration-500 ease-in-out" />
    ) : (
      <ArrowUpCircle className="w-5 h-5 flex-shrink-0 transition-transform duration-500 ease-in-out" />
    )}
  </button>
</div>

{/* Navigation Menu */}
<NavigationMenu
  showNavMenu={showNavMenu}
  setShowNavMenu={setShowNavMenu}
  sections={sections}
  activeSection={activeSection}
/>
```

## Required State Variables

```javascript
const [activeSection, setActiveSection] = useState('home');
const [showNavMenu, setShowNavMenu] = useState(false);
const [subsectionProgress, setSubsectionProgress] = useState(0);
const [scrollProgress, setScrollProgress] = useState(0);
const [sectionVisibility, setSectionVisibility] = useState({
  home: true,
  about: false,
  projects: false,
  contact: false
});
```

## Required Refs

```javascript
const homeRef = useRef(null);
const aboutRef = useRef(null);
const journeyRef = useRef(null);
const projectsRef = useRef(null);
const achievementsRef = useRef(null);
const contactRef = useRef(null);
const homeSectionRef = useRef(null);
const aboutSectionRef = useRef(null);

const sectionRefs = useMemo(() => ({
  home: homeRef,
  about: aboutRef,
  journey: journeyRef,
  projects: projectsRef,
  achievements: achievementsRef,
  contact: contactRef
}), []);

const sections = useMemo(() => [
  { id: 'home', ref: sectionRefs.home, label: 'Being Frank' },
  { id: 'about', ref: sectionRefs.about, label: 'The Story' },
  { id: 'projects', ref: sectionRefs.projects, label: 'Built to Last' },
  { id: 'contact', ref: sectionRefs.contact, label: 'Get in Touch' }
], [sectionRefs]);
```

## Required useEffect Hooks

### Intersection Observer for Section Detection
```javascript
useEffect(() => {
  let observer;
  const observerOptions = {
    threshold: [0.2, 0.5, 0.8],
    rootMargin: '-10% 0px'
  };

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.2) {
        setActiveSection(entry.target.id);
        requestAnimationFrame(() => {
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          entry.target.classList.add('opacity-100', 'translate-y-0');
        });
      } else {
        requestAnimationFrame(() => {
          entry.target.classList.add('opacity-0', 'translate-y-10');
          entry.target.classList.remove('opacity-100', 'translate-y-0');
        });
      }
    });
  };

  try {
    observer = new IntersectionObserver(handleIntersection, observerOptions);
    sections.forEach(section => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });
  } catch (error) {
    console.error('Intersection Observer error:', error);
  }

  return () => observer?.disconnect();
}, [sections]);
```

### Scroll Progress Tracking
```javascript
useEffect(() => {
  const handleScroll = () => {
    const sections = ['home', 'about', 'projects', 'contact'];
    const sectionElements = sections.map(id => document.getElementById(id));

    // Calculate total scrollable height
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;

    // Calculate progress based on current scroll position
    const progress = (currentScroll / totalHeight) * 100;
    setScrollProgress(progress);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Section Visibility Tracking
```javascript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        const ratio = entry.intersectionRatio;

        // Update visibility based on intersection ratio
        setSectionVisibility(prev => ({
          ...prev,
          [sectionId]: ratio >= 0.5
        }));
      });
    },
    {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: '0px'
    }
  );

  // Observe all sections
  if (homeRef.current) observer.observe(homeRef.current);
  if (aboutRef.current) observer.observe(aboutRef.current);
  if (projectsRef.current) observer.observe(projectsRef.current);
  if (contactRef.current) observer.observe(contactRef.current);

  return () => observer.disconnect();
}, []);
```

## Required Imports

```javascript
import { ArrowUpCircle, ArrowDownCircle, CheckCircle } from '@geist-ui/icons';
import { useEffect, useRef, useState, memo, useMemo } from "react";
import Link from "next/link";
```

## Features

- **Circular Progress Indicator**: Shows scroll progress with color-coded states
- **Section Detection**: Automatically detects current section and updates display
- **Smooth Scrolling**: Clicking menu items smoothly scrolls to sections
- **Click Outside Handling**: Menu closes when clicking outside
- **Responsive Design**: Works on all screen sizes
- **Animation States**: Smooth transitions and hover effects
- **Backdrop Blur**: Modern glassmorphism effect
- **Section Labels**: Dynamic section names in navigation bar

## Styling Notes

- Uses Tailwind CSS classes
- Fixed positioning (bottom-right corner)
- High z-index (z-50) to stay above other content
- Backdrop blur and transparency effects
- Smooth transitions with duration classes
- Hover states for all interactive elements
