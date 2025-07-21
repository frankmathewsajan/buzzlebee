'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, memo, useMemo, useCallback } from "react";

import { FaGithub, FaLinkedin, FaDiscord, FaInstagram } from 'react-icons/fa';
import { Space_Grotesk, Inter } from 'next/font/google';
import PortfolioMap from './components/PortfolioMap';
import DevNotice from './components/DevNotice';
import ContactModal from './components/ContactModal';
import projectsData from './projects.json';

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

// Project display component for homepage
const ProjectDisplayCard = memo(({ project, router, spaceGrotesk }) => {
  return (
    <div className="group cursor-pointer" onClick={() => router.push(`/projects#${project.id}`)}>
      {/* Divider Line */}
      <div className="w-full h-px bg-gray-300 mb-6"></div>
      
      {/* Project Info */}
      <div className="space-y-5 mb-8">
        {/* Project Name & Tech Stack */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-sm lg:text-base font-mono text-gray-900 ${project.id === 'monopoly-banking' ? 'mb-2 ' : ''}group-hover:text-red-600 transition-colors uppercase tracking-wider leading-tight ${spaceGrotesk.className}`}>
              {project.id === 'monopoly-banking' ? 'MONOPOLY DIGITAL BANKING SIMULATION' : project.title.replace(/System/g, 'SYSTEM').replace(/Platform/g, 'PLATFORM').toUpperCase()}
            </h3>
            <div className="flex items-center gap-2">
                {project.badges?.AWARDED && (
                  <div className="relative group/badge">
                    <div 
                      className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-mono cursor-pointer hover:bg-yellow-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(project.badges.AWARDED);
                      }}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      AWARDED
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 text-white text-xs rounded-lg opacity-0 group-hover/badge:opacity-100 transition-all duration-200 whitespace-nowrap z-10 pointer-events-none">
                      View award details →
                    </div>
                  </div>
                )}
                {project.badges?.CERTIFIED && (
                  <div className="relative group/certified">
                    <div 
                      className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-mono cursor-pointer hover:bg-yellow-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(project.badges.CERTIFIED);
                      }}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      CERTIFIED
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 text-white text-xs rounded-lg opacity-0 group-hover/certified:opacity-100 transition-all duration-200 whitespace-nowrap z-10 pointer-events-none">
                      View certification →
                    </div>
                  </div>
                )}
                {project.badges?.DEPLOYED && (
                  <div className="relative group/deployed">
                    <div 
                      className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-mono cursor-pointer hover:bg-green-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.badges.DEPLOYED, '_blank');
                      }}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      DEPLOYED
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 text-white text-xs rounded-lg opacity-0 group-hover/deployed:opacity-100 transition-all duration-200 whitespace-nowrap z-10 pointer-events-none">
                      Visit live {project.id === 'monopoly-banking' ? 'app' : 'site'} →
                    </div>
                  </div>
                )}
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">{tag}</span>
            ))}
          </div>
        </div>
        
        {/* Project Description */}
        <div>
          <p className="text-gray-600 text-sm leading-relaxed font-mono">
            {project.id === 'monopoly-banking' 
              ? "Gamified banking system inspired by Monopoly's Ultimate Banking, featuring real-time balance updates and comprehensive transaction management."
              : project.id === 'library-management'
              ? "Comprehensive GUI-based system handling library operations with inventory management, member tracking, and automated fine calculations."
              : project.description}
          </p>
          <span className="text-xs text-gray-400 font-mono mt-2 block">{project.timeline.split(' - ')[0] || project.timeline}</span>
        </div>
      </div>
      
      {/* Read More Button */}
      <div className="mt-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/projects#${project.id}`);
          }}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-mono group/button"
        >
          <svg 
            className="w-4 h-4 transition-transform group-hover/button:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          Read more
        </button>
      </div>
    </div>
  );
});

ProjectDisplayCard.displayName = 'ProjectDisplayCard';

export default function Home() {
  const router = useRouter();
  
  // Get projects that should be shown on the index page
  const indexProjects = projectsData.filter(project => project.SHOW_IN_INDEX);
  
  // Consolidated state for better management
  const [viewState, setViewState] = useState({
    sectionVisibility: { home: true, about: false, projects: false, contact: false },
    projectsOpacity: 0,
    contactOpacity: 0
  });

  // Contact Modal state
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactModalSource, setContactModalSource] = useState('social'); // 'social' or 'gmail'

  // Handle social link clicks - shows modal for private accounts and follow-back requests
  const handleSocialLinkClick = useCallback((platform, url) => {
    if (platform === 'instagram' || platform === 'discord' || platform === 'github' || platform === 'gmail') {
      setContactModalSource(platform === 'gmail' ? 'gmail' : 'social');
      setContactModalOpen(true);
    } else {
      window.open(url, '_blank');
    }
  }, []);
  // Refs for section elements - using useRef directly
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const homeSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);

  // Memoized refs object for easier access
  const sectionRefs = useMemo(() => ({
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    contact: contactRef,
    homeSection: homeSectionRef,
    aboutSection: aboutSectionRef
  }), []);

  // Memoized scroll handler for better performance
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
    
    // Batch state updates for better performance
    let newProjectsOpacity = 0;
    let newContactOpacity = 0;
    
    if (scrollY >= aboutMiddle && scrollY < contactQuarterTrigger) {
      newProjectsOpacity = 1;
    } else if (scrollY >= contactQuarterTrigger) {
      newContactOpacity = 1;
    }
    
    // Only update if values actually changed
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

  // Memoized intersection observer callback
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

  // Add CSS styles once on mount
  useEffect(() => {
    const styleId = 'home-page-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .tooltip-hover .tooltip-content {
        filter: none !important;
        z-index: 9999;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05);
      }
      .tooltip-hover .tooltip-text {
        filter: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) existingStyle.remove();
    };
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
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) cancelAnimationFrame(timeoutId);
    };
  }, [handleScroll]);

  // Intersection observer for section visibility
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

  // Combined scroll position management
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

  return (
    <div className="min-h-screen bg-[#e7dfd8]">
      {/* Development Notice */}
      <DevNotice />

      {/* Portfolio Explorer Map - Self-contained component */}
      <PortfolioMap />

      {/* Hero Section */}
      <section
        id="home"
        ref={sectionRefs.home}
        className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-1000 ease-in-out ${viewState.sectionVisibility.home ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-left space-y-12 ml-8">
              <div className="relative" ref={sectionRefs.homeSection}>
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

      {/* Introduction Article Section - Full Viewport */}
      <section
        id="about"
        ref={sectionRefs.about}
        className={`min-h-screen flex items-center justify-center bg-[#e7dfd8] transition-all duration-1000 ease-in-out ${viewState.sectionVisibility.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-screen flex items-center">
          <div className="w-full" ref={sectionRefs.aboutSection}>
            {/* Editorial Header - Refined */}
            <div className="mb-16">
              <div className="relative">
                {/* Refined Typography */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-semibold text-gray-900 font-sans uppercase tracking-wide">Quick</span>
                    <span className="text-4xl font-semibold text-red-600 font-sans uppercase tracking-wide">overview</span>
                  </div>
                </div>
                
                {/* Refined accent line */}
                <div className="mt-4 w-12 h-px bg-red-600"></div>
              </div>
            </div>

            {/* Main Article Content - Vogue Editorial Style */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              {/* Left Column - Chess Illustration */}
              <div className="lg:col-span-2 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[300px]">
                  <div className="relative aspect-square">
                    <Image
                      src="/images/chess.png"
                      alt="Chess pieces illustration"
                      fill
                      className="object-contain"
                      priority
                      sizes="(max-width: 768px) 300px, 300px"
                    />
                  </div>
                  {/* Editorial Caption - Magazine Style */}
                  <div className="mt-6 text-center space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-sans font-medium">
                      Strategic Thinking
                    </p>
                    <div className="w-16 h-px bg-red-500 mx-auto opacity-60"></div>
                    <p className="text-sm text-gray-600 font-serif italic leading-relaxed whitespace-nowrap">
                      Every move counts, both on the board and in code
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Article Text */}
              <div className="lg:col-span-3 space-y-8 lg:-mt-20">
                <div className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                  <span className="text-2xl font-medium font-sans text-gray-900">Hey</span>
                  <span className="text-xl font-medium font-serif italic text-gray-800 ml-1"> there! I&apos;m</span>
                  <span className="text-lg font-semibold text-red-600 ml-2">Frank</span>
                  <span className="text-lg font-normal text-gray-700">, and I build software when I feel someone might </span>
                  <span className="font-sans font-medium text-red-600 text-base tracking-wide">need</span>
                  <span className="text-lg font-normal text-gray-700"> it, started as </span>
                  <span className="font-sans font-medium text-gray-900 text-base tracking-wide">small fixes</span>
                  <span className="text-lg font-normal text-gray-700"> for </span>
                  <span className="font-sans font-medium text-red-600 text-base tracking-wide">my own problems</span>
                  <span className="text-lg font-normal text-gray-700">, and I later realized they could </span>
                  <span className="font-sans font-medium text-red-600 text-base tracking-wide">help others</span>
                  <span className="text-lg font-normal text-gray-700"> as well.</span>
                </div>
                
                <div className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                  Just&nbsp;
                  <span className="relative group tooltip-hover">
                    <Link href="/projects" className="text-red-600 font-bold underline decoration-red-300 text-lg hover:bg-red-50 px-1 rounded transition-colors cursor-pointer tooltip-text">
                      poke around
                    </Link>
                    <span className="tooltip-content absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-5 py-4 bg-gray-900/98 backdrop-blur-md text-white text-sm rounded-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out whitespace-nowrap z-50 pointer-events-none border border-gray-700/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)]">
                      Check out my projects →
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-900/98 filter drop-shadow-lg"></span>
                    </span>
                  </span>. Check out the projects, see what I&apos;ve built. If something catches your eye, 
                  <span className="font-sans font-semibold text-gray-900 uppercase text-sm tracking-wide"> GREAT</span>. If not, no worries, at least you got to see some 
                  <span className="text-red-500 font-serif italic"> decent</span> designs.
                </div>
                
                <div className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                  {/* The <span className="relative group tooltip-hover">
                    <Link href="/case-studies" className="tooltip-text font-sans text-gray-900 uppercase text-base tracking-wider hover:text-red-600 transition-colors cursor-pointer border-b border-gray-400 hover:border-red-400">
                      CASE STUDIES
                    </Link>
                    <span className="tooltip-content absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-5 py-4 bg-gray-900/98 backdrop-blur-md text-white text-sm rounded-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out whitespace-nowrap z-50 pointer-events-none border border-gray-700/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)]">
                      See my thinking process →
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-900/98 filter drop-shadow-lg"></span>
                    </span>
                  </span> page shows my&nbsp; 
                  <span className="text-red-600 font-serif italic text-lg">thinking process</span> and how I approach problems (the messy, iterative reality of development), and the projects are&nbsp; */}
                  The projects are&nbsp; 
                  <span className="font-sans text-gray-900 uppercase text-base tracking-tight">REAL</span> things I&apos;ve built for&nbsp; 
                  <span className="font-sans text-gray-900 uppercase text-base tracking-tight">REAL</span> problems. Some worked out better than others, but that&apos;s 
                  <span className="text-red-500 font-serif italic"> how it goes</span>.
                </div>

                <div className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                  If you like reading some of my&nbsp;
                  <span className="text-red-600 font-serif italic text-lg">backstory</span>, <span className="text-red-600 font-serif italic text-lg">education</span>, and <span className="text-red-600 font-serif italic text-lg">experience</span>, check out the&nbsp;
                  <span className="relative group tooltip-hover">
                    <Link href="/about" className="tooltip-text font-sans text-gray-900 uppercase text-base tracking-wider hover:text-red-600 transition-colors cursor-pointer border-b border-gray-400 hover:border-red-400">
                      ABOUT
                    </Link>
                    <span className="tooltip-content absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-5 py-4 bg-gray-900/98 backdrop-blur-md text-white text-sm rounded-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out whitespace-nowrap z-50 pointer-events-none border border-gray-700/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)]">
                      Read my story →
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-900/98 filter drop-shadow-lg"></span>
                    </span>
                  </span> page. It&apos;s written like an&nbsp;
                  <span className="text-red-500 font-serif italic">autobiography</span>, so grab some coffee first.
                </div>

                {/* Editorial Signature */}
                <div className="mt-12 pt-8 border-t border-gray-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-px bg-red-500"></div>
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-sans">Frank Mathew Sajan</span>
                    <div className="w-12 h-px bg-red-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Preview Section */}
      <section
        id="projects"
        ref={sectionRefs.projects}
        className={`min-h-screen flex items-center justify-center bg-[#e7dfd8] transition-all duration-1000 ease-in-out ${viewState.sectionVisibility.projects ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
          }`}
      >
        <div 
          className="w-full px-4 sm:px-6 lg:px-8 py-16 transition-opacity duration-700 ease-in-out"
          style={{ opacity: viewState.projectsOpacity }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Title Section */}
            <div className="mb-12 text-center">
              <p className="text-base text-gray-600 font-light max-w-xl mx-auto">
                Hand-picked projects across various domains.
              </p>
            </div>

            {/* Projects List - Dynamic from projects.json */}
            <div className="space-y-16 mb-8">
              
              {/* Row 1: First two projects */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {indexProjects.slice(0, 2).map((project, index) => (
                  <ProjectDisplayCard key={project.id} project={project} router={router} spaceGrotesk={spaceGrotesk} />
                ))}
              </div>

              {/* Row 2: Last two projects */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {indexProjects.slice(2, 4).map((project, index) => (
                  <ProjectDisplayCard key={project.id} project={project} router={router} spaceGrotesk={spaceGrotesk} />
                ))}
              </div>

            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Link 
                href="/projects" 
                className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 hover:shadow-lg font-medium tracking-wide uppercase text-sm"
              >
                View All Projects
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={sectionRefs.contact}
        className={`min-h-screen flex items-center justify-center bg-[#e7dfd8] transition-all duration-1000 ease-in-out ${viewState.sectionVisibility.contact ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
          }`}
      >
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 transition-opacity duration-700 ease-in-out"
          style={{ opacity: viewState.contactOpacity }}
        >
          {/* Main Contact Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left Column - GET IN TOUCH */}
            <div className="flex items-center justify-center lg:justify-start">
              <h2 className="font-thin uppercase tracking-tight text-gray-700" style={
                { fontSize: '8vw', 
                fontFamily: 'RecifeDisplay, serif', 
                lineHeight: '0.9' }
                }>GET IN TOUCH</h2>
            </div>

            {/* Right Column - Paragraphs */}
            <div className="">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  If you&apos;re here to understand what I have{' '}
                  <span className="relative group tooltip-hover">
                    <Link href="/projects" className="tooltip-text text-orange-600 font-semibold underline decoration-orange-300 hover:bg-orange-50 px-1 rounded transition-colors cursor-pointer">
                      built
                    </Link>
                    <span className="tooltip-content absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-5 py-4 bg-gray-900/98 backdrop-blur-md text-white text-sm rounded-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out whitespace-nowrap z-50 pointer-events-none border border-gray-700/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)]">
                      Check out my projects →
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-900/98 filter drop-shadow-lg"></span>
                    </span>
                  </span>, what I{' '}
                  <span className="relative group tooltip-hover">
                    <Link href="/blogs" className="tooltip-text text-orange-600 font-semibold underline decoration-orange-300 hover:bg-orange-50 px-1 rounded transition-colors cursor-pointer">
                      value
                    </Link>
                    <span className="tooltip-content absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-5 py-4 bg-gray-900/98 backdrop-blur-md text-white text-sm rounded-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out whitespace-nowrap z-50 pointer-events-none border border-gray-700/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)]">
                      Read my thoughts →
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-900/98 filter drop-shadow-lg"></span>
                    </span>
                  </span>, or what I can{' '}
                  {/* <span className="relative group tooltip-hover">
                    <Link href="/case-studies" className="tooltip-text text-orange-600 font-semibold underline decoration-orange-300 hover:bg-orange-50 px-1 rounded transition-colors cursor-pointer">
                      contribute
                    </Link>
                    <span className="tooltip-content absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-5 py-4 bg-gray-900/98 backdrop-blur-md text-white text-sm rounded-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out whitespace-nowrap z-50 pointer-events-none border border-gray-700/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)]">
                      See case studies →
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-900/98 filter drop-shadow-lg"></span>
                    </span>
                  </span>{' '} */}
                  <span className="text-orange-600 font-semibold">contribute</span>{' '}
                  — this is a good place to start.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Currently focused on integrating{' '}
                  <span className="font-medium text-orange-600">real world systems</span> with{' '}
                  <span className="font-medium text-orange-600">intelligent automation</span>{' '}
                  — across domains like{' '}
                  <span className="font-medium text-orange-500">IoT</span>,{' '}
                  <span className="font-medium text-orange-500">environmental tech</span>, and{' '}
                  <span className="font-medium text-orange-500">health & safety</span>.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Feel free to <span className="font-semibold text-gray-800">contact me</span>. I am always open to discussing{' '}
                  <span className="font-medium text-orange-500">new projects</span>,{' '}
                  <span className="font-medium text-orange-500">creative ideas</span>, or{' '}
                  <span className="font-medium text-orange-500">opportunities</span>{' '}
                  to contribute to your visions.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="border-t border-gray-300/50 pt-12">
            <div className="flex flex-col md:flex-row md:justify-between md:space-x-8 relative">
              {/* Site Map */}
              <div className="mb-8 md:mb-0">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 font-sans">Quick Links</h4>
                <div className="grid grid-cols-2 gap-x-0 gap-y-3">
                  <Link href="/" className="block text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    Home
                  </Link>
                  <Link href="/blogs" className="block text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    Blog
                  </Link>
                  <Link href="/projects" className="block text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    Projects
                  </Link>
                  {/* <Link href="/case-studies" className="block text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    Case Studies
                  </Link> */}
                  <Link href="/certifications" className="block text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    Certifications
                  </Link>
                  <Link href="/about" className="block text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    About & Experience
                  </Link>
                </div>
              </div>

              {/* Social Links */}
              <div className="relative mb-8 md:mb-0">
                {/* Left separator */}
                <div className="hidden md:block absolute -left-4 top-0 h-full w-px bg-gray-300/30"></div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-4 font-sans">Explore</h4>
                <div className="space-y-3">
                  {/* Row 1: GitHub and LinkedIn (balanced length) */}
                  <div className="grid grid-cols-2 gap-x-0">
                    <button 
                      onClick={() => handleSocialLinkClick('github', 'https://github.com/frankmathewsajan')}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 text-left relative group"
                    >
                      <FaGithub className="w-5 h-5" />
                      GitHub
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Connect
                      </span>
                    </button>
                    <button 
                      onClick={() => handleSocialLinkClick('linkedin', 'https://linkedin.com/in/frankmathewsajan')}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 text-left"
                    >
                      <FaLinkedin className="w-5 h-5" />
                      LinkedIn
                    </button>
                  </div>
                  {/* Row 2: Discord and Instagram (balanced length) */}
                  <div className="grid grid-cols-2 gap-x-0">
                    <button 
                      onClick={() => handleSocialLinkClick('discord', 'https://discord.com/users/frankmathewsajan')}
                      className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300 text-left relative group"
                    >
                      <FaDiscord className="w-5 h-5" />
                      Discord
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Private
                      </span>
                    </button>
                    <button 
                      onClick={() => handleSocialLinkClick('instagram', 'https://instagram.com/franklyy.idk')}
                      className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors duration-300 text-left relative group"
                    >
                      <FaInstagram className="w-5 h-5" />
                      Instagram
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Private
                      </span>
                    </button>
                  </div>
                  {/* Row 3: Email (full width) */}
                  <button 
                    onClick={() => handleSocialLinkClick('gmail', 'mailto:frankmathewsajan@gmail.com')}
                    className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors duration-300 text-left w-full"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Gmail
                  </button>
                </div>
                
                {/* Right separator */}
                <div className="hidden md:block absolute -right-4 top-0 h-full w-px bg-gray-300/30"></div>
              </div>

              {/* Info Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 font-sans">About This Site</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Built with Next.js, React, and Tailwind CSS. <br />Hosted on Google Firebase for optimal performance and reliability.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white/50 rounded text-xs text-gray-600">Next.js</span>
                  <span className="px-2 py-1 bg-white/50 rounded text-xs text-gray-600">React</span>
                  <span className="px-2 py-1 bg-white/50 rounded text-xs text-gray-600">Tailwind</span>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 pt-8 border-t border-gray-300/30">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-600">
                  © {new Date().getFullYear()} Frank Mathew Sajan. All rights reserved.
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)}
        variant={contactModalSource === 'gmail' ? 'contact' : 'social'}
        hideDirectAccess={contactModalSource === 'gmail'}
      />
    </div>
  );
}
