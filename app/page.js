'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, memo, useMemo } from "react";
import { ArrowUpCircle, ArrowDownCircle, CheckCircle } from '@geist-ui/icons';
import { FaGithub, FaLinkedin, FaDiscord, FaInstagram } from 'react-icons/fa';
import { Space_Grotesk, Inter } from 'next/font/google';

// Font setup
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

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
CustomGauge.displayName = 'CustomGauge';

const ProjectCard = memo(({ title, description, tags }) => {
  return (
    <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all duration-300">
      <h4 className="text-xl font-medium text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-white/50 rounded-full text-sm text-gray-600">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default function Home() {
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
  const [activeTechStack, setActiveTechStack] = useState('backend');

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

  useEffect(() => {
    if (sectionRefs.home.current) {
      sectionRefs.home.current.classList.remove('opacity-0', 'translate-y-10');
      sectionRefs.home.current.classList.add('opacity-100', 'translate-y-0');
    }
  }, [sectionRefs.home]);

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          scrollTimeout = null;
        }, 66);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add new effect for tracking subsection progress
  useEffect(() => {
    const handleScroll = () => {
      if (activeSection !== 'about') {
        setSubsectionProgress(0);
        return;
      }

      const aboutSection = document.getElementById('about');
      if (!aboutSection) return;

      const subsections = ['about-me', 'journey', 'education', 'experience', 'achievements', 'beyond-code'];
      const subsectionElements = subsections.map(id => document.getElementById(id));

      // Calculate total height of all subsections
      const totalHeight = subsectionElements.reduce((sum, element) => {
        return sum + (element ? element.offsetHeight : 0);
      }, 0);

      // Calculate current scroll position within about section
      const aboutRect = aboutSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionTop = aboutRect.top;
      const sectionHeight = aboutRect.height;

      // Calculate how far we've scrolled through the section
      let scrollProgress = 0;

      if (sectionTop < 0) {
        // We've scrolled past the top
        const scrolledAmount = Math.abs(sectionTop);
        const totalScrollable = sectionHeight + viewportHeight;
        scrollProgress = Math.min(100, (scrolledAmount / totalScrollable) * 100);
      }

      // Add small increments for each subsection
      subsectionElements.forEach((element, index) => {
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const elementTop = elementRect.top;
          const elementHeight = elementRect.height;

          // If element is in view
          if (elementTop < viewportHeight && elementTop + elementHeight > 0) {
            const elementProgress = Math.min(100,
              ((viewportHeight - elementTop) / (elementHeight + viewportHeight)) * 100
            );
            // Add a portion of progress for each subsection
            scrollProgress += (elementProgress / subsections.length);
          }
        }
      });

      // Ensure progress stays within bounds
      scrollProgress = Math.max(0, Math.min(100, scrollProgress));
      setSubsectionProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Add new effect for tracking overall scroll progress
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

  // Save scroll position when leaving the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('indexScrollPosition', window.scrollY.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Restore scroll position when returning to the page
  useEffect(() => {
    const savedScrollPosition = localStorage.getItem('indexScrollPosition');
    if (savedScrollPosition) {
      // Use setTimeout to ensure the page has rendered
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition));
        localStorage.removeItem('indexScrollPosition'); // Clear the saved position
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#e7dfd8]">
      {/* Hero Section */}
      <section
        id="home"
        ref={homeRef}
        className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-1000 ease-in-out ${sectionVisibility.home ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-left space-y-12 ml-8">
              <div className="relative" ref={homeSectionRef}>
                <h1 className="text-[4rem] md:text-[6rem] text-gray-800 font-caveat leading-[1.1] hover:scale-105 transition-transform cursor-default">
                  Just
                </h1>
                <div className="text-[5rem] md:text-[7rem] font-caveat text-gray-800 hover:scale-105 transition-transform cursor-default leading-[1.1]">
                  Frank
                </div>
                <p className="text-lg md:text-xl text-gray-600 mt-12 font-serif italic max-w-xl opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.4s_forwards] leading-relaxed tracking-wide">
                  Shaping ideas that transcend time<br />
                  <span className="ml-4 inline-block">—one bug at a time.</span>
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-6 mt-16 max-w-xl opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.6s_forwards]">
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl">
                    <div className="text-3xl font-caveat text-gray-800 mb-1">5+</div>
                    <div className="text-sm font-outfit text-gray-600">Years of Coding</div>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl">
                    <div className="text-3xl font-caveat text-gray-800 mb-1">10+</div>
                    <div className="text-sm font-outfit text-gray-600">AI/ML & Software Projects</div>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl">
                    <div className="text-3xl font-caveat text-gray-800 mb-1">20+</div>
                    <div className="text-sm font-outfit text-gray-600">Hackathons & Competitions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image - slightly smaller */}
            <div className="relative aspect-square w-full max-w-[450px] mx-auto opacity-0 translate-x-4 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
              <div className="absolute inset-0 bg-gray-900 rounded-3xl transform rotate-3 opacity-20 shadow-xl"></div>
              <Image
                src="/images/mathew.webp"
                alt="Frank Mathew Sajan"
                fill
                className="object-cover rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-2 bg-white/10 backdrop-blur-sm"
                priority
                sizes="(max-width: 768px) 100vw, 450px"
                style={{
                  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                  transition: 'transform 0.3s ease-out'
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 20;
                  const rotateY = (centerX - x) / 20;
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                }}
              />
            </div>
          </div>
        </div>
      </section>

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

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className={`min-h-screen flex items-center justify-center bg-[#e7dfd8] transition-all duration-1000 ease-in-out ${sectionVisibility.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          {/* About Me + Journey + Beyond Code */}
          <div id="about-me" className="space-y-20 mb-24" ref={aboutSectionRef}>
            {/* First Row - Title, Introduction and Image */}
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-16">
              <div className="space-y-6">
                <h2 className="text-5xl font-bold text-gray-900 font-caveat">
                  Let me introduce myself...
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                  <b className="text-2xl font-bold" style={{ fontFamily: 'Times New Roman' }}>Hi</b>, &nbsp;I&apos;m Frank. I write poetic reflections, so let me introduce myself in a way that feels more like art than a résumé.
                </p>
                <div className="w-12 h-1 bg-gray-900/20 rounded-full"></div>
                  <p className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                    When I&apos;m not coding, I play chess, watch anime, or sleep—because innovation never sleeps, but I do.
                  </p>
              </div>
              <div className="relative aspect-square w-full max-w-[300px] mx-auto">
                <div className="absolute inset-0 bg-gray-900 rounded-3xl transform rotate-3 opacity-20 shadow-xl"></div>
                <Image
                  src="/images/frank.jpg"
                  alt="Frank Mathew Sajan"
                  fill
                  className="object-cover rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-2 bg-white/10 backdrop-blur-sm"
                  priority
                  sizes="(max-width: 768px) 300px, 300px"
                  style={{
                    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                    transition: 'transform 0.3s ease-out'
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                  }}
                />
              </div>
            </div>

            {/* Second Row - Poem and Main Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Left Column - Poem */}
              <div className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100/20">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed text-lg font-serif text-center italic whitespace-nowrap">
                    In creation&apos;s throes, I find my grace,<br />
                    A rhythm born from chance&apos;s face;<br />
                    Where logic fades, and wildness sings,<br />
                    There, in the dance, my spirit springs.
                  </p>
                </div>
              </div>

              {/* Right Column - Main Text */}
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                  I believe the best ideas emerge from experimentation—breaking things on purpose just to see what happens. Playing it safe has never led to anything groundbreaking.
                </p>

                <p className="text-gray-700 leading-relaxed text-lg font-serif text-justify italic text-center">
                  Then again, if an idea can transcend time, I want to be the one shaping it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={projectsRef}
        className={`min-h-screen flex items-center justify-center bg-[#e7dfd8] transition-all duration-1000 ease-in-out ${sectionVisibility.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <div className="mb-8">
              <h2 className="text-5xl font-bold text-gray-900 font-caveat relative inline-block">
                My Building Blocks...
              </h2>
              <p className="text-sm text-gray-600 mt-3">Because sometimes, the right tools make all the difference</p>
            </div>

            {/* Tech Stack Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-6">
              <button
                onClick={() => setActiveTechStack('frontend')}
                className={`p-2 rounded-md transition-all duration-300 ${activeTechStack === 'frontend'
                    ? 'bg-white/80 text-gray-900 shadow-md border border-red-800'
                    : 'bg-white/50 hover:bg-white/80 text-gray-900'
                  }`}
              >
                <h3 className="text-sm font-medium">Frontend</h3>
              </button>
              <button
                onClick={() => setActiveTechStack('mobile')}
                className={`p-2 rounded-md transition-all duration-300 ${activeTechStack === 'mobile'
                    ? 'bg-white/80 text-gray-900 shadow-md border border-red-800'
                    : 'bg-white/50 hover:bg-white/80 text-gray-900'
                  }`}
              >
                <h3 className="text-sm font-medium">Mobile</h3>
              </button>
              <button
                onClick={() => setActiveTechStack('databases')}
                className={`p-2 rounded-md transition-all duration-300 ${activeTechStack === 'databases'
                    ? 'bg-white/80 text-gray-900 shadow-md border border-red-800'
                    : 'bg-white/50 hover:bg-white/80 text-gray-900'
                  }`}
              >
                <h3 className="text-sm font-medium">Databases</h3>
              </button>
              <button
                onClick={() => setActiveTechStack('backend')}
                className={`p-2 rounded-md transition-all duration-300 ${activeTechStack === 'backend'
                    ? 'bg-white/80 text-gray-900 shadow-md border border-red-800'
                    : 'bg-white/50 hover:bg-white/80 text-gray-900'
                  }`}
              >
                <h3 className="text-sm font-medium">Backend</h3>
              </button>
              <button
                onClick={() => setActiveTechStack('devops')}
                className={`p-2 rounded-md transition-all duration-300 ${activeTechStack === 'devops'
                    ? 'bg-white/80 text-gray-900 shadow-md border border-red-800'
                    : 'bg-white/50 hover:bg-white/80 text-gray-900'
                  }`}
              >
                <h3 className="text-sm font-medium">DevOps</h3>
              </button>
              <button
                onClick={() => setActiveTechStack('ai')}
                className={`p-2 rounded-md transition-all duration-300 ${activeTechStack === 'ai'
                    ? 'bg-white/80 text-gray-900 shadow-md border border-red-800'
                    : 'bg-white/50 hover:bg-white/80 text-gray-900'
                  }`}
              >
                <h3 className="text-sm font-medium">AI/ML</h3>
              </button>
            </div>

            {/* Detailed View */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg min-h-[300px]">
              {activeTechStack === 'backend' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Backend</h3>
                  <div className="grid grid-cols-1 gap-12">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-medium text-gray-900">Django</h4>
                          <Link href="/certifications#django" className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Certified
                          </Link>
                        </div>
                        <p className="text-base text-gray-600">My go-to for robust web applications, handling complex business logic and API management</p>
                      </div>
                      <Image src="/images/logos/techstack/django.jpg" alt="Django" width={120} height={120} className="rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-gray-900">Flask</h4>
                        <p className="text-base text-gray-600">When I need a lightning-fast prototype or a quick local server, Flask is the move</p>
                      </div>
                      <Image src="/images/logos/techstack/flask.png" alt="Flask" width={120} height={120} className="rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg" />
                    </div>
                  </div>
                </div>
              )}

              {activeTechStack === 'databases' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Databases & Storage</h3>
                  <div className="grid grid-cols-1 gap-12">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-gray-900">Supabase / SQLite</h4>
                        <p className="text-base text-gray-600">Supabase for SQL-backed projects, but if things are lightweight, I keep it simple with SQLite</p>
                      </div>
                      <Image src="/images/logos/techstack/supabase.png" alt="Supabase" width={120} height={120} className="rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-gray-900">Firebase / MongoDB</h4>
                        <p className="text-base text-gray-600">I&apos;ve worked with NoSQL solutions like Firebase and MongoDB, but I rarely need them</p>
                      </div>
                      <Image src="/images/logos/techstack/firebase.svg" alt="Firebase" width={120} height={120} className="rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg" />
                    </div>
                  </div>
                </div>
              )}

              {activeTechStack === 'frontend' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Frontend</h3>
                  <div className="grid grid-cols-1 gap-12">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-medium text-gray-900">Next.js</h4>
                          <Link href="/certifications#nextjs" className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Certified
                          </Link>
                        </div>
                        <p className="text-base text-gray-600">My preferred framework for server-rendered React applications</p>
                      </div>
                      <Image src="/images/logos/techstack/next.webp" alt="Next.js" width={120} height={120} className="rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-gray-900">Vite</h4>
                        <p className="text-base text-gray-600">For building fast and modern web applications</p>
                      </div>
                      <Image src="/images/logos/techstack/vite.jpg" alt="Vite" width={120} height={120} className="rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-gray-900">Electron</h4>
                        <p className="text-base text-gray-600">For building cross-platform desktop applications</p>
                      </div>
                      <Image src="/images/logos/techstack/electron.svg" alt="Electron" width={120} height={120} className="rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg" />
                    </div>
                  </div>
                </div>
              )}

              {activeTechStack === 'mobile' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Mobile Development</h3>
                  <div className="grid grid-cols-1 gap-12">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-medium text-gray-900">React Native + Expo</h4>
                          <Link href="/certifications#react-native" className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Certified
                          </Link>
                        </div>
                        <p className="text-base text-gray-600">For mobile apps, I keep it smooth with React Native and Expo</p>
                      </div>
                      <Image src="/images/logos/techstack/exporn.webp" alt="Expo" width={120} height={120} className="rounded-md hover:scale-110 transition-all duration-300 hover:shadow-lg" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-gray-900">Cordova</h4>
                        <p className="text-base text-gray-600">For hybrid mobile applications when web technologies are preferred</p>
                      </div>
                      <Image src="/images/logos/techstack/cordova.png" alt="Cordova" width={120} height={120} className="rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg" />
                    </div>
                  </div>
                </div>
              )}

              {activeTechStack === 'devops' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900">DevOps & Deployment</h3>
                  <div className="grid grid-cols-1 gap-12">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-medium text-gray-900">Docker</h4>
                          <Link href="/certifications#docker" className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Certified
                          </Link>
                        </div>
                        <p className="text-base text-gray-600">For containerization and consistent development environments</p>
                      </div>
                      <Image src="/images/logos/techstack/docker.png" alt="Docker" width={120} height={120} className="rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-gray-900">GitHub Actions</h4>
                        <p className="text-base text-gray-600">For CI/CD pipelines and automated workflows</p>
                      </div>
                      <Image src="/images/logos/techstack/gitbub-actions.avif" alt="GitHub Actions" width={120} height={120} className="rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-gray-900">AWS / Firebase</h4>
                        <p className="text-base text-gray-600">For cloud deployment and hosting solutions</p>
                      </div>
                      <Image src="/images/logos/techstack/aws.png" alt="AWS" width={120} height={120} className="rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg" />
                    </div>
                  </div>
                </div>
              )}

              {activeTechStack === 'ai' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900">AI & Machine Learning</h3>
                  <div className="grid grid-cols-1 gap-12">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-medium text-gray-900">TensorFlow / PyTorch</h4>
                          <Link href="/certifications#tensorflow" className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Certified
                          </Link>
                        </div>
                        <p className="text-base text-gray-600">For deep learning and neural network implementations</p>
                      </div>
                      <Image src="/images/logos/techstack/tf.webp" alt="TensorFlow" width={120} height={120} className="rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-gray-900">scikit-learn</h4>
                        <p className="text-base text-gray-600">For traditional machine learning algorithms and data analysis</p>
                      </div>
                      <Image src="/images/logos/techstack/scikit-learn.png" alt="scikit-learn" width={120} height={120} className="rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-gray-900">Hugging Face</h4>
                        <p className="text-base text-gray-600">For integrating advanced language models into applications</p>
                      </div>
                      <Image src="/images/logos/techstack/huggin face.png" alt="Hugging Face" width={120} height={120} className="rounded-full hover:scale-110 transition-all duration-300 hover:shadow-lg" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className={`min-h-screen flex items-center justify-center bg-[#e7dfd8] transition-all duration-1000 ease-in-out ${sectionVisibility.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - CTA Content */}
            <div className="">
              <div>
                <h2 className="text-5xl font-bold text-gray-900 mb-8 font-caveat">Don&apos;t be shy!</h2>
                <p className="text-lg md:text-xl text-gray-700 font-serif text-justify mb-8" style={{ fontFamily: 'Times New Roman' }}>
                  If you&apos;re here to understand what I have built, what I value, or what I can contribute - this is a good place to start. Currently focused on integrating real world systems with intelligent automation - across domains like IoT, environmental tech, and health and safety.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-12">
                  <Link 
                    href="/projects" 
                    className={`${inter.className} px-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm text-[#2e2e2e] hover:bg-white/80 hover:shadow-lg transition-all duration-300 flex items-center gap-2 group text-sm`}
                  >
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Projects
                  </Link>
                  <Link 
                    href="/certifications" 
                    className={`${inter.className} px-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm text-[#2e2e2e] hover:bg-white/80 hover:shadow-lg transition-all duration-300 flex items-center gap-2 group text-sm`}
                  >
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Certifications
                  </Link>
                  <Link 
                    href="/blogs" 
                    className={`${inter.className} px-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm text-[#2e2e2e] hover:bg-white/80 hover:shadow-lg transition-all duration-300 flex items-center gap-2 group text-sm`}
                  >
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    Blog
                  </Link>
                  <Link 
                    href="/about" 
                    className={`${inter.className} px-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm text-[#2e2e2e] hover:bg-white/80 hover:shadow-lg transition-all duration-300 flex items-center gap-2 group text-sm`}
                  >
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Education & Experience
                  </Link>
                </div>
                <p className="text-lg text-gray-600 font-serif text-justify" style={{ fontFamily: 'Times New Roman' }}>
                  Feel free to contact me. I am always open to discussing new projects, creative ideas, or opportunities to contribute to your visions.
                </p>
              </div>
            </div>

            {/* Right Column - Contact Info */}
            <div className="grid grid-cols-1 gap-8 pt-16">
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-600">Frank Mathew Sajan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:frankmathewsajan@gmail.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                      frankmathewsajan@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect with Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a href="https://github.com/frankmathewsajan" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <FaGithub className="w-5 h-5" />
                    GitHub
                  </a>
                  <a href="https://linkedin.com/in/frankmathewsajan" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <FaLinkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                  <a href="https://discord.com/users/frankmathewsajan" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <FaDiscord className="w-5 h-5" />
                    Discord
                  </a>
                  <a href="https://instagram.com/frankmathewsajan" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <FaInstagram className="w-5 h-5" />
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
