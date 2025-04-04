'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, memo, useMemo } from "react";
import { ArrowUpCircle, ArrowDownCircle, CheckCircle } from '@geist-ui/icons';
import { FaGithub, FaLinkedin, FaDiscord, FaInstagram } from 'react-icons/fa';

const CustomGauge = memo(({ value, size = "small", currentSection, subsectionProgress = 0 }) => {
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
  const totalProgress = value + (subsectionProgress / 100);

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
  const [activeSubsection, setActiveSubsection] = useState(null);
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

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (!aboutSection) return;

      const subsections = ['about-me', 'journey', 'education', 'experience', 'beyond-code'];
      const subsectionElements = subsections.map(id => document.getElementById(id));

      const visibleSubsection = subsectionElements.find(element => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });

      if (visibleSubsection) {
        setActiveSubsection(visibleSubsection.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <div key={section.id}>
              <button
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

              {/* Subsections for About section */}
              {section.id === 'about' && activeSection === 'about' && section.subsections && (
                <div className="pl-6 bg-gray-50/50">
                  {section.subsections.map((subsection) => (
                    <button
                      key={subsection.id}
                      onClick={() => {
                        setShowNavMenu(false);
                        const element = document.getElementById(subsection.id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      className={`w-full px-6 py-2 text-left text-sm transition-all duration-300 ${activeSubsection === subsection.id
                        ? 'text-gray-900 font-medium bg-gray-100/50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
                        }`}
                    >
                      {subsection.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
  
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const journeyRef = useRef(null);
  const projectsRef = useRef(null);
  const achievementsRef = useRef(null);
  const contactRef = useRef(null);

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
    {
      id: 'about',
      ref: sectionRefs.about,
      label: 'The Story',
      subsections: [
        { id: 'about-me', label: 'Who\'s This Guy?' },
        { id: 'journey', label: 'The Chaos' },
        { id: 'education', label: 'Street Cred' },
        { id: 'experience', label: 'Battle Scars' },
        { id: 'achievements', label: 'Flex Wall' },
        { id: 'beyond-code', label: 'When I Touch Grass' }
      ]
    },
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

  return (
    <div className="min-h-screen bg-[#e7dfd8]">
      {/* Hero Section */}
      <section
        id="home"
        ref={sectionRefs.home}
        className="min-h-screen flex items-center justify-center relative overflow-hidden opacity-0 translate-y-10 transition-all duration-1000 ease-in-out"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-left space-y-12 ml-8">
              <div className="relative">
                <h1 className="text-[4rem] md:text-[6rem] text-gray-800 opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_forwards] font-caveat leading-[1.1] hover:scale-105 transition-transform cursor-default">
                  Just
                </h1>
                <div className="text-[5rem] md:text-[7rem] font-caveat text-gray-800 opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.2s_forwards] hover:scale-105 transition-transform cursor-default leading-[1.1]">
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
                    <div className="text-3xl font-caveat text-gray-800 mb-1">3+</div>
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
              subsectionProgress={subsectionProgress}
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
        ref={sectionRefs.about}
        className="min-h-screen flex items-center justify-center bg-[#e7dfd8] opacity-0 translate-y-10 transition-all duration-1000 ease-in-out"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* About Me + Journey + Beyond Code */}
          <div id="about-me" className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
            {/* Left Column - Image */}
            <div className="relative aspect-square w-full max-w-[400px] mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gray-900 rounded-3xl transform rotate-3 opacity-20 shadow-xl"></div>
              <Image
                src="/images/frank.jpg"
                alt="Frank Mathew Sajan"
                fill
                className="object-cover rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-2 bg-white/10 backdrop-blur-sm"
                priority
                sizes="(max-width: 768px) 300px, 400px"
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

            {/* Middle Column - About Me */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 font-caveat relative inline-block">
                Who is this guy?
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gray-900 to-transparent"></div>
              </h2>


              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                  Hi, I&apos;m Frank. Navigating the unknown before I even grasp the map—I thrive in the space between logic and chaos.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                  I believe the best ideas come from experimentation—breaking things on purpose just to see what happens.
                  Playing it safe has never led to anything groundbreaking.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                  When not coding, I&apos;m deep-diving into chess, maybe some anime, or the future of gene editing—because innovation never sleeps. If an idea can transcend time, I want to be the one shaping it.
                </p>

              </div>
            </div>



          </div>

          {/* Journey Timeline */}
          <div className="space-y-16">
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              <div className="space-y-12">
                {/* Journey */}
                <div id="journey" className="relative pl-8">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gray-900 rounded-full"></div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Journey</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Started with a simple &quot;Hello, World!&quot;—now building AI that speaks for itself. <br/>
                    From debugging first loops to solving real-world problems, it&apos;s been a journey of curiosity, chaos, and constant growth.
                  </p>

                </div>

                {/* Education Section */}
                <div id="education" className="relative pl-8">
                  {/* Timeline Dot */}
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gray-900 rounded-full"></div>

                  {/* Section Title */}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Education</h3>

                  {/* Education Card */}
                  <div className="bg-white/20 backdrop-blur-sm p-8 rounded-xl">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-6">
                        <div className="relative w-20 h-20">
                          <Image
                            src="/images/logos/vitap.png"
                            alt="VIT-AP Logo"
                            fill
                            className="object-contain rounded-xl p-1.5"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <h4 className="text-xl font-medium text-gray-900 mb-2">
                            B.Tech in Computer Science & Engineering
                          </h4>
                          <p className="text-gray-600 text-base">
                            Vellore Institute of Technology (VIT-AP), Amaravati
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <span className="text-gray-900 text-sm font-medium block">
                            Expected Graduation: May 2027
                          </span>
                        </div>
                        <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg group relative cursor-pointer">
                          <div className="flex items-center gap-2 transition-all duration-200">
                            <span className="text-gray-900 text-sm font-medium">CGPA</span>
                            <span className="text-gray-600 group-hover:hidden">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </span>
                            <span className="text-gray-900 text-sm font-medium hidden group-hover:inline">
                              8.95 / 10.00
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <details className="group marker:content-['']">
                      <summary className="flex items-center gap-2 cursor-pointer justify-end text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">
                        <span className="group-open:hidden">Key Courses</span>
                        <span className="hidden group-open:inline">Show less</span>
                        <svg className="w-4 h-4 group-open:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">
                        <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-3">Core Computer Science</h5>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>Data Structures & Algorithms</li>
                            <li>Computer Architecture</li>
                            <li>Operating Systems</li>
                            <li>Database Management</li>
                          </ul>
                        </div>

                        <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-3">AI & Machine Learning</h5>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>Artificial Intelligence</li>
                            <li>Machine Learning</li>
                            <li>Deep Learning</li>
                            <li>Computer Vision</li>
                          </ul>
                        </div>

                        <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-3">Mathematics</h5>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>Discrete Mathematics & Logic</li>
                            <li>Linear Algebra & Matrices</li>
                            <li>Probability & Statistics</li>
                            <li>Calculus & Optimization</li>
                          </ul>
                        </div>

                        <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-3">Advanced Topics</h5>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>Cloud Computing</li>
                            <li>Software Engineering</li>
                            <li>Web Technologies</li>
                            <li>Control Engineering & IoT</li>
                          </ul>
                        </div>
                      </div>
                    </details>
                  </div>
                </div>


                {/* Experience */}
                <div id="experience" className="relative pl-8">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gray-900 rounded-full"></div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Experience</h3>
                  <div className="grid grid-cols-1 gap-6">
                    {/* Purple Technologies */}
                    <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                      <div className="flex justify-between items-start">
                        {/* Company Logo and Name - Left Side */}
                        <div className="flex items-start gap-4">
                          <div className="relative w-20 h-20">
                            <Image
                              src="/images/logos/purple.jpg"
                              alt="Purple Technologies Logo"
                              fill
                              className="object-contain rounded-full p-1.5"
                              sizes="64px"
                            />
                          </div>
                          <div>
                            <Link
                              href="https://purpletechno.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group"
                            >
                              <h4 className="text-xl font-medium text-gray-900 mb-1 hover:text-gray-600 transition-colors duration-200 flex items-center gap-1">
                                Purple Techno Solutions
                                <svg className="w-4 h-4 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </h4>
                            </Link>
                            <p className="text-gray-600 text-base">Full Stack & ML Intern</p>
                          </div>
                        </div>

                        {/* Date - Right Side */}
                        <div className="-mr-2">
                          <span className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-gray-900 text-sm font-medium">
                            Aug 2023 – Present
                          </span>
                        </div>
                      </div>

                      {/* Details Section */}
                      <div className="">
                        <details className="group marker:content-['']">
                          <summary className="flex items-center gap-2 cursor-pointer justify-end text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">
                            <span className="group-open:hidden">Show more</span>
                            <span className="hidden group-open:inline">Show less</span>
                            <svg className="w-4 h-4 group-open:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="mt-4 pl-4 border-l-2 border-gray-200">
                            <ul className="list-disc list-inside text-gray-600 space-y-1.5 marker:text-gray-400">
                              <li>Developed and maintained responsive web applications using Next.js and TailwindCSS.</li>
                              <li>Implemented secure authentication systems and integrated third-party APIs.</li>
                              <li>Collaborated with the design team to create intuitive user interfaces and improve UX.</li>
                            </ul>
                          </div>
                        </details>
                      </div>
                    </div>

                    {/* TechToGreen */}
                    <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                      <div className="flex justify-between items-start">
                        {/* Company Logo and Name - Left Side */}
                        <div className="flex items-start gap-4">
                          <div className="relative w-20 h-20">
                            <Image
                              src="/images/logos/t2g.png"
                              alt="TechToGreen Logo"
                              fill
                              className="object-contain rounded-xl p-1.5"
                              sizes="64px"
                            />
                          </div>
                          <div>
                            <Link
                              href="https://t2gdrone.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group"
                            >
                              <h4 className="text-xl font-medium text-gray-900 mb-1 hover:text-gray-600 transition-colors duration-200 flex items-center gap-1">
                                TechToGreen Drone & Robotics Pvt. Ltd.
                                <svg className="w-4 h-4 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </h4>
                            </Link>
                            <p className="text-gray-600 text-base">Research and Development Intern</p>
                          </div>
                        </div>

                        {/* Date - Right Side */}
                        <div className="-mr-2">
                          <span className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-gray-900 text-sm font-medium">
                            Aug 2023 – Present
                          </span>
                        </div>
                      </div>

                      {/* Details Section */}
                      <div className="">
                        <details className="group marker:content-['']">
                          <summary className="flex items-center gap-2 cursor-pointer justify-end text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">
                            <span className="group-open:hidden">Show more</span>
                            <span className="hidden group-open:inline">Show less</span>
                            <svg className="w-4 h-4 group-open:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="mt-4 pl-4 border-l-2 border-gray-200">
                            <ul className="list-disc list-inside text-gray-600 space-y-1.5 marker:text-gray-400">
                              <li>Developed intelligent safety and agricultural systems, including a hazard detection helmet and autonomous drones.</li>
                              <li>Optimized Django REST APIs, reducing response time by 20% and enhancing mobile interfaces using React Native.</li>
                              <li>Implemented computer vision algorithms for plant anomaly detection and established automated testing protocols.</li>
                            </ul>
                          </div>
                        </details>
                      </div>
                    </div>

                    {/* IETE Chapter */}
                    <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                      <div className="flex justify-between items-start">
                        {/* Company Logo and Name - Left Side */}
                        <div className="flex items-start gap-4">
                          <div className="relative w-19 h-19">
                            <Image
                              src="/images/logos/iete.jpg"
                              alt="IETE Logo"
                              fill
                              className="object-contain rounded-full p-1.5"
                              sizes="64px"
                            />
                          </div>
                          <div>
                            <Link
                              href="https://iete.org"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group"
                            >
                              <h4 className="text-xl font-medium text-gray-900 mb-1 hover:text-gray-600 transition-colors duration-200 flex items-center gap-1">
                                Institute of Electronics & Telecom Engineers
                                <svg className="w-4 h-4 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </h4>
                            </Link>
                            <p className="text-gray-600 text-base">Deputy Captain</p>
                          </div>
                        </div>

                        {/* Date and Badge - Right Side */}
                        <div className="-mr-2 flex items-center gap-3">
                          <span className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-gray-900 text-sm font-medium">
                            Nov 2023 – Jan 2025
                          </span>
                          <span className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-gray-900 text-sm font-medium">
                            Academic
                          </span>
                        </div>
                      </div>

                      {/* Details Section */}
                      <div className="">
                        <details className="group marker:content-['']">
                          <summary className="flex items-center gap-2 cursor-pointer justify-end text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">
                            <span className="group-open:hidden">Show more</span>
                            <span className="hidden group-open:inline">Show less</span>
                            <svg className="w-4 h-4 group-open:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="mt-4 pl-4 border-l-2 border-gray-200">
                            <ul className="list-disc list-inside text-gray-600 space-y-1.5 marker:text-gray-400">
                              <li>Led AI, IoT, and web development workshops, increasing engagement and technical expertise.</li>
                              <li>Conducted technical discussions and mentored junior members in successful project execution.</li>
                            </ul>
                          </div>
                        </details>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notable Achievements */}
                <div id="achievements" className="relative pl-8">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gray-900 rounded-full"></div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Notable Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-5xl font-caveat text-gray-800 group-hover:scale-110 transition-transform duration-300">01</div>
                        <div className="relative w-16 h-16">
                          <Image
                            src="/images/logos/SA.png"
                            alt="NASA Space Apps Logo"
                            fill
                            className="object-contain rounded-full p-1.5"
                            sizes="64px"
                          />
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 font-outfit">NASA Space Apps 2024</h4>
                      <p className="text-gray-600 font-serif">Global Nominee</p>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-5xl font-caveat text-gray-800 group-hover:scale-110 transition-transform duration-300">02</div>
                        <div className="relative w-16 h-16">
                          <Image
                            src="/images/logos/alcove.png"
                            alt="HackAP Logo"
                            fill
                            className="object-contain rounded-full p-1.5"
                            sizes="64px"
                          />
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 font-outfit">HackAP - Transport & Logistics</h4>
                      <p className="text-gray-600 font-serif">Hackathon First Place</p>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-5xl font-caveat text-gray-800 group-hover:scale-110 transition-transform duration-300">03</div>
                        <div className="relative w-16 h-16">
                          <Image
                            src="/images/logos/BSG.svg"
                            alt="Bharat Scouts & Guides Logo"
                            fill
                            className="object-contain rounded-full p-1.5"
                            sizes="64px"
                          />
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 font-outfit">Rajya Puraskar Award</h4>
                      <p className="text-gray-600 font-serif">Bharat Scouts & Guides Honor</p>
                    </div>
                  </div>
                </div>



                {/* Beyond Code */}
                <div id="beyond-code" className="relative pl-8">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gray-900 rounded-full"></div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Beyond Code</h3>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-6">
                    When I&apos;m not lost in the abyss of algorithms or academics, I&apos;m either questioning the future of human potential,
                    overanalyzing anime plots, or calculating ten moves ahead in a chess match—only to blunder spectacularly.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Current Obsessions</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Artificial Intelligence in Biotechnology</li>
                        <li>Chess, Strategy & Mental Warfare</li>
                        <li>Anime, Storytelling & Philosophy</li>
                        <li>Breaking Systems & Redefining Norms</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Focus on Tech Stack and Projects */}
      <section
        id="projects"
        ref={sectionRefs.projects}
        className="min-h-screen flex items-center justify-center bg-[#e7dfd8] opacity-0 translate-y-10 transition-all duration-1000 ease-in-out"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="relative max-w-6xl mx-auto">
              {/* Vertical Separator */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
              
              {/* Horizontal Separator */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>

              {/* Title */}
              <div className="absolute left-0 top-0 -translate-y-12 flex flex-col">
                <h2 className="text-4xl font-bold text-gray-900 font-caveat relative inline-block opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]">
                  Guess What I Use?
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gray-900 to-transparent"></div>
                </h2>
                <p className="text-sm text-gray-600 mt-4 opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.4s_forwards]">Because sometimes, the right tools make all the difference</p>
              </div>

              {/* Navigation Buttons - Top Right */}
              <div className="absolute right-0 top-0 -translate-y-12 flex gap-4">
                <Link
                  href="/projects"
                  className="px-6 py-2.5 bg-gray-900/90 backdrop-blur-sm rounded-lg text-white hover:bg-gray-800 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl group opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_1.2s_forwards]"
                >
                  <span className="flex flex-col items-start">
                    <span className="flex items-center gap-2">
                      <span>What&apos;s the Fuss?</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="text-xs text-gray-300 mt-0.5">View My Projects</span>
                  </span>
                </Link>
                <Link
                  href="/case-studies"
                  className="px-6 py-2.5 bg-gray-100/80 backdrop-blur-sm rounded-lg text-gray-900 hover:bg-gray-200/80 transition-all duration-300 text-sm font-medium border border-gray-300/50 hover:border-gray-400/50 group opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_1.2s_forwards]"
                >
                  <span className="flex flex-col items-start">
                    <span className="flex items-center gap-2">
                      <span>Built This. But Why?</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="text-xs text-gray-600 mt-0.5">Read Case Studies</span>
                  </span>
                </Link>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-2 grid-rows-2 gap-12 py-16">
                {/* Top Left - Backend & AI */}
                <div className="relative px-12 opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.6s_forwards]">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Backend & AI</h3>
                  <div className="space-y-3">
                    <div className="group relative">
                      <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <span className="text-base">Django</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 pl-4">My go-to for AI-driven applications, handling inference, classification, and API management</p>
                    </div>
                    <div className="group relative">
                      <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <span className="text-base">Flask</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 pl-4">When I need a lightning-fast prototype or a quick local server, Flask is the move</p>
                    </div>
                  </div>
                </div>

                {/* Top Right - Databases & Storage */}
                <div className="relative px-12 opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.8s_forwards]">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Databases & Storage</h3>
                  <div className="space-y-3">
                    <div className="group relative">
                      <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <span className="text-base">Supabase / SQLite</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 pl-4">Supabase for SQL-backed projects, but if things are lightweight, I keep it simple with SQLite</p>
                    </div>
                    <div className="group relative">
                      <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <span className="text-base">Firebase / MongoDB</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 pl-4">I&apos;ve worked with NoSQL solutions like Firebase and MongoDB, but I rarely need them</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Left - Frontend & Mobile */}
                <div className="relative px-12 opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_1.0s_forwards]">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Frontend & Mobile</h3>
                  <div className="space-y-3">
                    <div className="group relative">
                      <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <span className="text-base">React / Vue / Next.js</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 pl-4">If performance and UI/UX matter, I bring these into play</p>
                    </div>
                    <div className="group relative">
                      <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <span className="text-base">React Native + Expo</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 pl-4">For mobile apps, I keep it smooth with React Native and Expo</p>
                    </div>
                    <div className="group relative">
                      <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <span className="text-base">Django + React</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 pl-4">When AI meets a slick frontend, Django runs the API while React handles the user experience</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Right - Deployment & Hosting */}
                <div className="relative px-12 opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_1.2s_forwards]">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Deployment & Hosting</h3>
                  <div className="space-y-3">
                    <div className="group relative">
                      <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <span className="text-base">Firebase / GitHub Pages</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 pl-4">Static hosting made easy. Firebase for seamless deployment with SSL and custom domains; GitHub Pages for quick, free hosting</p>
                    </div>
                    <div className="group relative">
                      <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <span className="text-base">AWS EC2</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 pl-4">For dynamic websites that need serious backend muscle</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={sectionRefs.contact}
        className="min-h-screen flex items-center justify-center bg-[#e7dfd8] opacity-0 translate-y-10 transition-all duration-700 ease-out"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Don&apos;t be shy!</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Feel free to contact me. I am always open to discussing new projects, creative ideas, or opportunities to contribute to your visions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400">Not there yet. 🥢 </span>
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
      </section>
    </div>
  );
}
