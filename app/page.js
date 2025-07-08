'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, memo, useMemo, useCallback } from "react";

import { FaGithub, FaLinkedin, FaDiscord, FaInstagram } from 'react-icons/fa';
import { Space_Grotesk, Inter } from 'next/font/google';
import PortfolioMap from './components/PortfolioMap';

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

export default function Home() {
  const [sectionVisibility, setSectionVisibility] = useState({
    home: true,
    about: false,
    projects: false,
    contact: false
  });

  const [projectsBlur, setProjectsBlur] = useState(true);
  const [projectsOpacity, setProjectsOpacity] = useState(0);
  const [contactOpacity, setContactOpacity] = useState(0);

  // Add missing CSS keyframes
  useEffect(() => {
    const style = document.createElement('style');
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
    return () => document.head.removeChild(style);
  }, []);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const homeSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);

  // Track section visibility with intersection observer
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Get the about section (Let me introduce myself)
      const aboutSection = document.getElementById('about');
      const contactSection = document.getElementById('contact');
      
      if (aboutSection && contactSection) {
        // Get the offset positions from the top of the document
        const aboutOffsetTop = aboutSection.offsetTop;
        const aboutHeight = aboutSection.offsetHeight;
        const aboutMiddle = aboutOffsetTop + (aboutHeight / 2);
        
        // Get projects and contact section positions
        const projectsSection = document.getElementById('projects');
        const contactOffsetTop = contactSection.offsetTop;
        const projectsOffsetTop = projectsSection ? projectsSection.offsetTop : 0;
        
        // Calculate midpoints for consistent transitions (like other sections)
        const projectsHeight = projectsSection ? projectsSection.offsetHeight : 0;
        const contactHeight = contactSection.offsetHeight;
        const projectsMiddle = projectsOffsetTop + (projectsHeight / 2);
        const contactMiddle = contactOffsetTop + (contactHeight / 2);
        
        // Debug logging
        console.log({
          scrollY,
          aboutMiddle,
          projectsMiddle,
          contactMiddle,
          projectsVisible: scrollY >= aboutMiddle && scrollY < projectsMiddle,
          contactVisible: scrollY >= projectsMiddle
        });
        
        // Simple consistent logic: 
        // Projects visible from about middle to projects middle
        // Contact visible from projects middle onwards
        if (scrollY >= aboutMiddle && scrollY < projectsMiddle) {
          setProjectsOpacity(1);
          setContactOpacity(0);
        } else if (scrollY >= projectsMiddle) {
          setProjectsOpacity(0);
          setContactOpacity(1);
        } else {
          setProjectsOpacity(0);
          setContactOpacity(0);
        }
      }

      // Update current section based on scroll position
      const sections = ['home', 'about', 'projects', 'contact'];
      const sectionElements = sections.map(id => document.getElementById(id));
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        if (sectionElements[i]) {
          const rect = sectionElements[i].getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
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
      {/* Portfolio Explorer Map - Self-contained component */}
      <PortfolioMap />

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

      {/* Introduction Article Section - Full Viewport */}
      <section
        id="about"
        ref={aboutRef}
        className={`min-h-screen flex items-center justify-center bg-[#e7dfd8] transition-all duration-1000 ease-in-out ${sectionVisibility.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-screen flex items-center">
          <div className="w-full" ref={aboutSectionRef}>
            {/* Editorial Header - Playful Typography Mix */}
            <div className="mb-16">
              <div className="relative">
                {/* Main Typography Composition - Strategic Red Accents */}
                <div className="flex flex-wrap items-baseline gap-3 mb-6">
                  <span className="text-5xl font-black text-gray-900 font-sans uppercase tracking-tight">LET</span>
                  <span className="text-2xl font-light text-gray-700 font-serif lowercase italic">me</span>
                  <span className="text-4xl font-black text-red-600 font-sans uppercase tracking-wide">INTRODUCE</span>
                </div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-2xl font-medium text-gray-700 font-serif lowercase italic">my</span>
                  <span className="text-6xl font-black text-gray-900 font-sans uppercase tracking-tight">SELF</span>
                  <span className="text-2xl text-red-500 font-serif">...</span>
                </div>
                
                {/* Minimal Decorative Elements */}
                <div className="absolute -top-2 -left-1 w-2 h-2 bg-red-600 rounded-full opacity-60"></div>
                <div className="absolute top-1/4 -right-3 w-1.5 h-1.5 bg-red-400 rounded-full opacity-40"></div>
                <div className="mt-8 w-20 h-px bg-gradient-to-r from-red-600 via-gray-800 to-transparent opacity-70"></div>
              </div>
            </div>

            {/* Main Article Content - Vogue Editorial Style */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              {/* Left Column - Chess Illustration */}
              <div className="lg:col-span-2 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[380px]">
                  <div className="relative aspect-square">
                    <Image
                      src="/images/chess.png"
                      alt="Chess pieces illustration"
                      fill
                      className="object-contain"
                      priority
                      sizes="(max-width: 768px) 380px, 380px"
                    />
                  </div>
                  {/* Editorial Caption - Magazine Style */}
                  <div className="mt-6 text-center space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-sans font-medium">
                      Strategic Thinking
                    </p>
                    <div className="w-16 h-px bg-red-500 mx-auto opacity-60"></div>
                    <p className="text-sm text-gray-600 font-serif italic leading-relaxed max-w-xs mx-auto">
                      Every move counts, both on the board and in code
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Article Text */}
              <div className="lg:col-span-3 space-y-8 lg:-mt-20">
                <div className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                  <span className="text-3xl font-black font-sans text-gray-900">HEY</span> 
                  <span className="text-xl font-light font-serif italic text-gray-800 ml-2">there!</span> 
                  <span className="text-lg font-medium text-red-600 ml-2">Frank</span> here. I could throw around buzzwords and tell you I'm 
                  <span className="text-red-500 font-serif italic">"passionate about innovative solutions,"</span> but honestly? I just like building 
                  <span className="font-sans font-medium text-gray-900 uppercase text-base tracking-wide"> STUFF</span> that works.
                </div>
                
                <div className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                  When I'm not <span className="font-sans text-gray-900 uppercase text-base tracking-wide">CODING</span>, I'm probably playing 
                  <span className="font-sans text-gray-900 uppercase text-sm tracking-wider"> CHESS</span>&nbsp;
                  <span className="text-red-500 font-serif italic text-base">(badly)</span>, watching 
                  <span className="font-sans text-gray-900 uppercase text-sm tracking-wider"> ANIME</span>&nbsp;
                  <span className="text-red-600 font-serif italic text-base">(obsessively)</span>, or 
                  <span className="font-sans text-gray-900 uppercase text-sm tracking-wider"> SLEEPING</span>&nbsp;
                  <span className="text-red-500 font-serif italic text-base">(not enough)</span>. It's a simple life, but it keeps me 
                  <span className="text-red-600"> content</span>.
                </div>
                
                <div className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                  <span className="text-2xl font-black font-sans text-gray-900 uppercase tracking-tight">LOOK</span>, instead of me rambling about what I can do, just&nbsp;
                  <span className="relative group tooltip-hover">
                    <Link href="/projects" className="text-red-600 font-bold underline decoration-red-300 text-lg hover:bg-red-50 px-1 rounded transition-colors cursor-pointer tooltip-text">
                      poke around
                    </Link>
                    <span className="tooltip-content absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-5 py-4 bg-gray-900/98 backdrop-blur-md text-white text-sm rounded-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out whitespace-nowrap z-50 pointer-events-none border border-gray-700/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)]">
                      Check out my projects →
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-900/98 filter drop-shadow-lg"></span>
                    </span>
                  </span>. Check out the projects, see what I've built. If something catches your eye, 
                  <span className="font-sans font-semibold text-gray-900 uppercase text-sm tracking-wide"> GREAT</span>. If not, no worries—at least you got to see some 
                  <span className="text-red-500 font-serif italic"> decent</span> web design.
                </div>
                
                <div className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                  The <span className="relative group tooltip-hover">
                    <Link href="/case-studies" className="tooltip-text font-sans text-gray-900 uppercase text-base tracking-wider hover:text-red-600 transition-colors cursor-pointer border-b border-gray-400 hover:border-red-400">
                      CASE STUDIES
                    </Link>
                    <span className="tooltip-content absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-5 py-4 bg-gray-900/98 backdrop-blur-md text-white text-sm rounded-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out whitespace-nowrap z-50 pointer-events-none border border-gray-700/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)]">
                      See my thinking process →
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-900/98 filter drop-shadow-lg"></span>
                    </span>
                  </span> section shows my&nbsp; 
                  <span className="text-red-600 font-serif italic text-lg">thinking process</span> and how I approach problems (the messy, iterative reality of development), and the projects are&nbsp; 
                  <span className="font-sans text-gray-900 uppercase text-base tracking-tight">REAL</span> things I've built for&nbsp; 
                  <span className="font-sans text-gray-900 uppercase text-base tracking-tight">REAL</span> problems. Some worked out better than others, but that's 
                  <span className="text-red-500 font-serif italic"> how it goes</span>.
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
        ref={projectsRef}
        className={`min-h-screen flex items-center justify-center bg-[#e7dfd8] transition-all duration-1000 ease-in-out ${sectionVisibility.projects ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
          }`}
      >
        <div 
          className="w-full px-4 sm:px-6 lg:px-8 py-16 transition-opacity duration-700 ease-in-out"
          style={{ opacity: projectsOpacity }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Title Section */}
            <div className="mb-12 text-center">
              <p className="text-base text-gray-600 font-light max-w-xl mx-auto">
                Top 4 projects solving real problems with clean, functional design
              </p>
            </div>

            {/* Projects List */}
            <div className="space-y-16 mb-8">
              
              {/* Row 1: Intelligent Safety Helmet System & AI-Ignite Educational Platform */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Intelligent Safety Helmet System */}
                <div className="group cursor-pointer">
                  {/* Divider Line */}
                  <div className="w-full h-px bg-gray-300 mb-6"></div>
                  
                  {/* Project Info */}
                  <div className="space-y-5 mb-8">
                    {/* Project Name & Tech Stack */}
                    <div>
                      <h3 className={`text-sm lg:text-base font-mono text-gray-900 mb-2 group-hover:text-red-600 transition-colors uppercase tracking-wider leading-tight ${spaceGrotesk.className}`}>
                        INTELLIGENT SAFETY HELMET SYSTEM
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">Arduino</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">C++</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">IoT</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">GPS</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div>
                      <p className="text-gray-600 text-sm leading-relaxed font-mono">
                        Award-winning IoT solution providing real-time hazard detection with GPS tracking 
                        and emergency communication for industrial safety applications.
                      </p>
                      <span className="text-xs text-gray-400 font-mono mt-2 block">2024</span>
                    </div>
                  </div>
                  
                  {/* Project Mockup/Image */}
                  <div className="aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:shadow-lg transition-shadow">
                    <div className="text-center p-8">
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="text-xs font-mono text-gray-600 tracking-wider uppercase">SAFETY TECHNOLOGY</div>
                    </div>
                  </div>
                </div>

                {/* AI-Ignite Educational Platform */}
                <div className="group cursor-pointer">
                  {/* Divider Line */}
                  <div className="w-full h-px bg-gray-300 mb-6"></div>
                  
                  {/* Project Info */}
                  <div className="space-y-5 mb-8">
                    {/* Project Name & Tech Stack */}
                    <div>
                      <h3 className={`text-sm lg:text-base font-mono text-gray-900 mb-2 group-hover:text-red-600 transition-colors uppercase tracking-wider leading-tight ${spaceGrotesk.className}`}>
                        AI-IGNITE EDUCATIONAL PLATFORM
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">TensorFlow</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">Python</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">AWS</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">Machine Learning</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div>
                      <p className="text-gray-600 text-sm leading-relaxed font-mono">
                        AI-powered learning platform with adaptive testing that personalizes education 
                        based on individual learning patterns and progress analytics.
                      </p>
                      <span className="text-xs text-gray-400 font-mono mt-2 block">2023</span>
                    </div>
                  </div>
                  
                  {/* Project Mockup/Image */}
                  <div className="aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:shadow-lg transition-shadow">
                    <div className="text-center p-8">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="text-xs font-mono text-gray-600 tracking-wider uppercase">AI EDUCATION</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Banking Simulation System & Library Management System */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Banking Simulation System */}
                <div className="group cursor-pointer">
                  {/* Divider Line */}
                  <div className="w-full h-px bg-gray-300 mb-6"></div>
                  
                  {/* Project Info */}
                  <div className="space-y-5 mb-8">
                    {/* Project Name & Tech Stack */}
                    <div>
                      <h3 className={`text-sm lg:text-base font-mono text-gray-900 mb-2 group-hover:text-red-600 transition-colors uppercase tracking-wider leading-tight ${spaceGrotesk.className}`}>
                        DIGITAL BANKING SIMULATION
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">Node.js</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">MongoDB</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">Express</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">Real-time</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div>
                      <p className="text-gray-600 text-sm leading-relaxed font-mono">
                        Gamified banking system inspired by Monopoly's Ultimate Banking, featuring 
                        real-time balance updates and comprehensive transaction management.
                      </p>
                      <span className="text-xs text-gray-400 font-mono mt-2 block">2023</span>
                    </div>
                  </div>
                  
                  {/* Project Mockup/Image */}
                  <div className="aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:shadow-lg transition-shadow">
                    <div className="text-center p-8">
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="text-xs font-mono text-gray-600 tracking-wider uppercase">FINTECH SIMULATION</div>
                    </div>
                  </div>
                </div>

                {/* Library Management System */}
                <div className="group cursor-pointer">
                  {/* Divider Line */}
                  <div className="w-full h-px bg-gray-300 mb-6"></div>
                  
                  {/* Project Info */}
                  <div className="space-y-5 mb-8">
                    {/* Project Name & Tech Stack */}
                    <div>
                      <h3 className={`text-sm lg:text-base font-mono text-gray-900 mb-2 group-hover:text-red-600 transition-colors uppercase tracking-wider leading-tight ${spaceGrotesk.className}`}>
                        LIBRARY MANAGEMENT SYSTEM
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">Python</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">Tkinter</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">SQLite</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">GUI</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div>
                      <p className="text-gray-600 text-sm leading-relaxed font-mono">
                        Comprehensive GUI-based system handling library operations with inventory 
                        management, member tracking, and automated fine calculations.
                      </p>
                      <span className="text-xs text-gray-400 font-mono mt-2 block">2023</span>
                    </div>
                  </div>
                  
                  {/* Project Mockup/Image */}
                  <div className="aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:shadow-lg transition-shadow">
                    <div className="text-center p-8">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="text-xs font-mono text-gray-600 tracking-wider uppercase">LIBRARY SYSTEM</div>
                    </div>
                  </div>
                </div>
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
        ref={contactRef}
        className={`min-h-screen flex items-center justify-center bg-[#e7dfd8] transition-all duration-1000 ease-in-out ${sectionVisibility.contact ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
          }`}
      >
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 transition-opacity duration-700 ease-in-out"
          style={{ opacity: contactOpacity }}
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
                  If you're here to understand what I have{' '}
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
                  <span className="relative group tooltip-hover">
                    <Link href="/case-studies" className="tooltip-text text-orange-600 font-semibold underline decoration-orange-300 hover:bg-orange-50 px-1 rounded transition-colors cursor-pointer">
                      contribute
                    </Link>
                    <span className="tooltip-content absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-5 py-4 bg-gray-900/98 backdrop-blur-md text-white text-sm rounded-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out whitespace-nowrap z-50 pointer-events-none border border-gray-700/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)]">
                      See case studies →
                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-900/98 filter drop-shadow-lg"></span>
                    </span>
                  </span>{' '}
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
                  <Link href="/case-studies" className="block text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    Case Studies
                  </Link>
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
                    <a href="https://github.com/frankmathewsajan" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300">
                      <FaGithub className="w-5 h-5" />
                      GitHub
                    </a>
                    <a href="https://linkedin.com/in/frankmathewsajan" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                      <FaLinkedin className="w-5 h-5" />
                      LinkedIn
                    </a>
                  </div>
                  {/* Row 2: Discord and Instagram (balanced length) */}
                  <div className="grid grid-cols-2 gap-x-0">
                    <a href="https://discord.com/users/frankmathewsajan" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                      <FaDiscord className="w-5 h-5" />
                      Discord
                    </a>
                    <a href="https://instagram.com/franklyy.idk" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors duration-300">
                      <FaInstagram className="w-5 h-5" />
                      Instagram
                    </a>
                  </div>
                  {/* Row 3: Email (full width) */}
                  <a href="mailto:frankmathewsajan@gmail.com"
                    className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Gmail
                  </a>
                </div>
                
                {/* Right separator */}
                <div className="hidden md:block absolute -right-4 top-0 h-full w-px bg-gray-300/30"></div>
              </div>

              {/* Info Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 font-sans">About This Site</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Built with Next.js, React, and Tailwind CSS. <br />Hosted on modern infrastructure for optimal performance and reliability.
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
    </div>
  );
}
