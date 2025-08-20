'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { ArrowUpCircle, ArrowDownCircle } from '@geist-ui/icons';
import Image from 'next/image';
import { Space_Grotesk, Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PortfolioMap from '../components/PortfolioMap';
import projects from '../projects.json'; // Assuming projects.json is in the same directory

// Font setup
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function Projects() {
  const [activeProject, setActiveProject] = useState('overview');
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [visibleSection, setVisibleSection] = useState('overview');
  const [showMiniProjectsModal, setShowMiniProjectsModal] = useState(false);

  
  

  const categories = {
    "IoT/Embedded": ["helmet-system"],
    "Full Stack": ["st-gd-convent", "monopoly-banking"],
    "Course Projects": ["library-management", "hss-manager"]
  };

  const overviewRef = useRef(null);
  const helmetSystemRef = useRef(null);
  const stGdConventRef = useRef(null);
  const monopolyBankingRef = useRef(null);
  const libraryManagementRef = useRef(null);
  const hssManagerRef = useRef(null);

  const projectRefs = useMemo(() => ({
    overview: overviewRef,
    'helmet-system': helmetSystemRef,
    'st-gd-convent': stGdConventRef,
    'monopoly-banking': monopolyBankingRef,
    'library-management': libraryManagementRef,
    'hss-manager': hssManagerRef
  }), []);

  const themes = {
    dark: {
      bg: '#0A0F1E',
      card: '#111827',
      text: {
        primary: '#F9FAFB',
        secondary: '#D1D5DB'
      },
      accent: {
        primary: '#3B82F6',
        secondary: '#8B5CF6'
      }
    },
    light: {
      bg: '#F9FAFB',
      card: '#FFFFFF',
      text: {
        primary: '#111827',
        secondary: '#4B5563'
      },
      accent: {
        primary: '#2563EB',
        secondary: '#7C3AED'
      }
    }
  };

  const theme = isDarkMode ? themes.dark : themes.light;

  // Add theme toggle button styles
  const toggleButtonStyles = `
    fixed top-8 right-8 z-50 p-3 rounded-full 
    ${isDarkMode ? 'bg-white/10' : 'bg-gray-900/10'} 
    backdrop-blur-sm transition-all duration-300
    hover:scale-110 border 
    ${isDarkMode ? 'border-white/20' : 'border-gray-900/20'}
  `;

  // Update navigation menu styles
  const navMenuStyles = `
    fixed right-0 top-1/2 -translate-y-1/2 z-50
    ${isDarkMode ? 'bg-[#1F2937]/90' : 'bg-white/90'}
    backdrop-blur-sm rounded-l-2xl shadow-xl overflow-hidden
    border ${isDarkMode ? 'border-[#3B82F6]/30' : 'border-gray-200'}
    transition-all duration-300
  `;

  // Color schemes for different domains
  const domainColors = {
    'IoT/Embedded Systems': {
      bg: '#FFF9E6',
      text: '#321b15',
      accent: '#8B4513'
    },
    'AI/ML': {
      bg: '#F5F5F5',
      text: '#2C3E50',
      accent: '#34495E'
    },
    'Full-stack Development': {
      bg: '#ece5d8',
      text: '#321b15',
      accent: '#5D503A'
    },
    'Financial Technology': {
      bg: '#E8F4F8',
      text: '#2B6CB0',
      accent: '#2C5282'
    },
    'Educational Software': {
      bg: '#F0FDF4',
      text: '#2F855A',
      accent: '#276749'
    },
    'CS50P Final Project': {
      bg: '#E8F4F8',
      text: '#2B6CB0',
      accent: '#2C5282'
    },
    'CS50W Final Project': {
      bg: '#F0FDF4',
      text: '#2F855A',
      accent: '#276749'
    }
  };

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(100, (currentScroll / Math.max(1, totalHeight)) * 100);
      setScrollProgress(progress);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {        
        // Find the section that's most visible in the viewport
        const sections = ['overview', ...projects.map(p => p.id)];
        let currentSection = 'overview';
        let maxVisibility = 0;
        
        sections.forEach(sectionId => {
          const element = document.getElementById(sectionId);
          if (!element) return;
          
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // Calculate how much of the section is visible
          const visibleTop = Math.max(0, -rect.top);
          const visibleBottom = Math.min(rect.height, viewportHeight - rect.top);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          
          const visibilityPercentage = (visibleHeight / Math.max(1, rect.height)) * 100;
          
          if (visibilityPercentage > maxVisibility) {
            maxVisibility = visibilityPercentage;
            currentSection = sectionId;
          }
        });
        
        if (currentSection !== activeProject) {
          setActiveProject(currentSection);
          setVisibleSection(currentSection);
        }
      }, 100);
    };

    // Remove the wheel event handler to allow natural scrolling
    // const handleWheel = (e) => {
    //   if (isScrolling) return;
    //   
    //   e.preventDefault();
    //   
    //   const sections = ['overview', ...projects.map(p => p.id)];
    //   const currentIndex = sections.indexOf(activeProject);
    //   
    //   if (e.deltaY > 0 && currentIndex < sections.length - 1) {
    //     const nextSection = projectRefs[sections[currentIndex + 1]].current;
    //     if (nextSection) {
    //       nextSection.scrollIntoView({ behavior: 'smooth' });
    //       setActiveProject(sections[currentIndex + 1]);
    //       setVisibleSection(sections[currentIndex + 1]);
    //     }
    //   } else if (e.deltaY < 0 && currentIndex > 0) {
    //     const prevSection = projectRefs[sections[currentIndex - 1]].current;
    //     if (prevSection) {
    //       prevSection.scrollIntoView({ behavior: 'smooth' });
    //       setActiveProject(sections[currentIndex - 1]);
    //       setVisibleSection(sections[currentIndex - 1]);
    //     }
    //   }
    // };

    // Initial scroll calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Removed wheel event listener to allow natural scrolling
    // window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [activeProject, projectRefs]);

  // Add CSS for smooth scrolling
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      section {
        scroll-snap-align: start;
        scroll-snap-stop: always;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    };

    const observer = new IntersectionObserver((entries) => {
      let mostVisibleEntry = null;
      let maxVisibilityRatio = 0;

      entries.forEach(entry => {
        if (entry.intersectionRatio > maxVisibilityRatio) {
          maxVisibilityRatio = entry.intersectionRatio;
          mostVisibleEntry = entry;
        }
      });

      if (mostVisibleEntry && mostVisibleEntry.intersectionRatio > 0.3) {
        const sectionId = mostVisibleEntry.target.id;
        setVisibleSection(sectionId);
        setActiveProject(sectionId);
      }
    }, options);

    // Observe all sections
    const sections = ['overview', ...projects.map(p => p.id)];
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.6, ease: 'easeIn' }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const timelineItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  // Add a new section in the overview for mini projects
  const miniProjects = {
    "CS50P": projects.find(p => p.id === 'library-management').relatedMiniProjects,
    "CS50W": projects.find(p => p.id === 'hss-manager').relatedMiniProjects,
    "Full Stack Open": [
      { name: "Note App", tech: "React, Node.js" },
      { name: "Phonebook", tech: "MERN Stack" },
      { name: "Blog List", tech: "MERN Stack" },
      { name: "Countries", tech: "React, REST APIs" }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Portfolio Explorer Map - Always available */}
      <PortfolioMap />

      {/* Back to Top Button - Bottom Right */}
      {activeProject !== 'overview' && (
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => projectRefs.overview.current?.scrollIntoView({ behavior: 'smooth' })}
            className={`p-3 rounded-full border border-[#5D503A]/20 hover:border-[#5D503A] text-[#5D503A] hover:text-[#5D503A]/80 transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white/90`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Overview Section */}
      <section
        id="overview"
        ref={projectRefs.overview}
        className="min-h-screen flex items-start relative px-8 bg-gradient-to-br from-[#FAF5EE] via-[#F8F2E9] to-[#FAF5EE] pt-16"
      >
        <motion.div 
          className="max-w-[90vw] mx-auto w-full"
          initial="hidden"
          animate={visibleSection === 'overview' ? 'visible' : 'exit'}
          variants={fadeInUp}
        >
          <motion.h1 
            className={`${spaceGrotesk.className} text-5xl md:text-7xl leading-none text-[#5D503A] mb-12`}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 }
              }
            }}
          >
            Built to<br />Challenge
          </motion.h1>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            variants={sectionVariants}
            initial="hidden"
            animate={visibleSection === 'overview' ? 'visible' : 'exit'}
          >
            {/* Left Column - Featured Projects */}
            <motion.div className="space-y-8" variants={sectionVariants}>
              <motion.div className="space-y-4" variants={sectionVariants}>
                <motion.h3 variants={itemVariants} className={`${spaceGrotesk.className} text-base md:text-lg text-[#5D503A] uppercase tracking-wider`}>
                  Featured Projects
                </motion.h3>
                <motion.div className="space-y-4" variants={staggerContainer}>
                  {projects.filter(p => !p.category.includes('CS50')).map((project) => (
                    <motion.button
                      key={project.id}
                      variants={itemVariants}
                      onClick={() => projectRefs[project.id].current?.scrollIntoView({ behavior: 'smooth' })}
                      className="group block text-left w-full"
                    >
                      <div className="flex items-baseline justify-between border-b border-[#5D503A]/20 pb-2 group-hover:border-[#5D503A] transition-all duration-200"
                        style={{
                          boxShadow: `0 2px 4px -2px ${domainColors[project.category]?.text}10`,
                        }}
                      >
                        <div className="space-y-0.5">
                          <span className={`${inter.className} text-base text-[#5D503A] block`}>{project.title}</span>
                          <span className={`${inter.className} text-xs text-[#5D503A]/60`}>{project.category}</span>
                        </div>
                        <span className={`${inter.className} text-xs text-[#5D503A]/60`}>{project.timeline}</span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Course Projects and Scroll Indicator */}
            <motion.div className="flex flex-col justify-between" variants={sectionVariants}>
              {/* Course Projects Section */}
              <motion.div className="space-y-4" variants={sectionVariants}>
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <h3 className={`${spaceGrotesk.className} text-base md:text-lg text-[#5D503A] uppercase tracking-wider`}>
                    Course Projects
                  </h3>
                  <button
                    onClick={() => setShowMiniProjectsModal(true)}
                    className={`${inter.className} text-xs text-[#5D503A] hover:text-[#5D503A]/60 transition-colors duration-200 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#5D503A]/20 hover:border-[#5D503A]/40`}
                  >
                    View Mini Projects
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </motion.div>
                <motion.div className="space-y-4" variants={staggerContainer}>
                  {projects.filter(p => p.category.includes('CS50')).map((project) => (
                    <motion.button
                      key={project.id}
                      variants={itemVariants}
                      onClick={() => projectRefs[project.id].current?.scrollIntoView({ behavior: 'smooth' })}
                      className="group block text-left w-full"
                    >
                      <div className="flex items-baseline justify-between border-b border-[#5D503A]/20 pb-2 group-hover:border-[#5D503A] transition-all duration-200"
                        style={{
                          boxShadow: `0 2px 4px -2px ${domainColors[project.category]?.text}10`,
                        }}
                      >
                        <div className="space-y-0.5">
                          <span className={`${inter.className} text-base text-[#5D503A] block`}>{project.title}</span>
                          <span className={`${inter.className} text-xs text-[#5D503A]/60`}>{project.category}</span>
                        </div>
                        <span className={`${inter.className} text-xs text-[#5D503A]/60`}>{project.timeline}</span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div 
                className="flex items-center justify-center mt-24"
                variants={sectionVariants}
              >
                <motion.button 
                  className="relative w-24 h-24 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    const sections = ['overview', ...projects.map(p => p.id)];
                    const currentIndex = sections.indexOf(visibleSection);
                    if (currentIndex < sections.length - 1) {
                      const nextSectionId = sections[currentIndex + 1];
                      const nextElement = projectRefs[nextSectionId]?.current;
                      if (nextElement) {
                        nextElement.scrollIntoView({ behavior: 'smooth' });
                        setActiveProject(nextSectionId);
                        setVisibleSection(nextSectionId);
                      }
                    }
                  }}
                  animate={{
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="absolute inset-0 border-2 border-[#5D503A]/40 rounded-full"></div>
                  <div className="flex flex-col items-center">
                    <span className={`${inter.className} text-sm text-[#5D503A] mb-1`}>scroll</span>
                    <svg 
                      className="w-4 h-4 text-[#5D503A]" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Mini Projects Modal */}
      {showMiniProjectsModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowMiniProjectsModal(false)}
        >
          <motion.div 
            className="bg-[#FAF5EE] rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#5D503A]/10 bg-[#FAF5EE]">
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A]`}>
                Course Mini Projects
              </h3>
              <button
                onClick={() => setShowMiniProjectsModal(false)}
                className="text-[#5D503A]/60 hover:text-[#5D503A] transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-8">
              {Object.entries(miniProjects).map(([course, projects]) => (
                <div key={course} className="space-y-4">
                  <h4 className={`${spaceGrotesk.className} text-lg text-[#5D503A]`}>
                    {course}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projects.map((project, index) => (
                      <div key={index} className="group p-4 rounded-lg border border-[#5D503A]/10 hover:border-[#5D503A]/30 transition-colors duration-200">
                        <p className={`${inter.className} text-base text-[#5D503A]`}>
                          {project.name}
                        </p>
                        <p className={`${inter.className} text-sm text-[#5D503A]/60 mt-1`}>
                          {project.tech}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Individual Project Sections */}
      {projects.map((project) => {
        const colors = domainColors[project.category];
        
        return (
          <section
            key={project.id}
            id={project.id}
            ref={projectRefs[project.id]}
            className="min-h-screen flex items-center relative"
            style={{ backgroundColor: colors.bg }}
          >
            <motion.div 
              className="max-w-[90vw] mx-auto w-full px-8 py-16"
              initial="hidden"
              animate={visibleSection === project.id ? 'visible' : 'exit'}
              variants={fadeInUp}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <motion.div 
                  className="space-y-12"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { duration: 0.6, ease: 'easeOut' }
                    }
                  }}
                >
                  <div>
                    <p className={`${inter.className} text-sm mb-2`} style={{ color: colors.accent }}>
                      {project.category}
                    </p>
                    <h2 className={`${spaceGrotesk.className} text-6xl`} style={{ color: colors.text }}>
                      {project.title}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className={`${spaceGrotesk.className} text-sm uppercase tracking-wider`}
                        style={{ color: colors.accent }}>
                        Overview
                      </h3>
                      <p className={`${inter.className} text-lg`} style={{ color: `${colors.text}CC` }}>
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className={`${spaceGrotesk.className} text-sm uppercase tracking-wider`}
                        style={{ color: colors.accent }}>
                        Achievement
                      </h3>
                      <p className={`${inter.className} italic`} style={{ color: colors.text }}>
                        {project.achievements}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    {project.has_demo && (
                      <a
                        href={project.links.demo}
                        className={`${inter.className} px-6 py-2 rounded-full transition-colors duration-200`}
                        style={{ 
                          backgroundColor: colors.text,
                          color: colors.bg
                        }}
                      >
                        View Demo
                      </a>
                    )}
                    {project.has_github && (
                      project.has_github === "in_progress" ? (
                        <span
                          className={`${inter.className} px-6 py-2 rounded-full transition-colors duration-200 opacity-60`}
                          style={{ 
                            border: `1px solid ${colors.text}`,
                            color: colors.text
                          }}
                        >
                          GitHub - In Progress
                        </span>
                      ) : (
                        <a
                          href={project.links.github}
                          className={`${inter.className} px-6 py-2 rounded-full transition-colors duration-200`}
                          style={{ 
                            border: `1px solid ${colors.text}`,
                            color: colors.text
                          }}
                        >
                          GitHub
                        </a>
                      )
                    )}
                    {project.has_case_study && !project.case_study_hidden && (
                      <Link
                        href={project.links.caseStudy}
                        className={`${inter.className} px-6 py-2 rounded-full transition-colors duration-200`}
                        style={{ 
                          border: `1px solid ${colors.text}`,
                          color: colors.text
                        }}
                      >
                        View Case Study
                      </Link>
                    )}
                  </div>
                </motion.div>

                <motion.div 
                  className="space-y-12"
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 }
                    }
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className={`${spaceGrotesk.className} text-sm uppercase tracking-wider mb-2`}
                        style={{ color: colors.accent }}>
                        Role
                      </h3>
                      <p className={`${inter.className}`} style={{ color: `${colors.text}CC` }}>
                        {project.role}
                      </p>
                    </div>
                    <div>
                      <h3 className={`${spaceGrotesk.className} text-sm uppercase tracking-wider mb-2`}
                        style={{ color: colors.accent }}>
                        Timeline
                      </h3>
                      <p className={`${inter.className}`} style={{ color: `${colors.text}CC` }}>
                        {project.timeline}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className={`${spaceGrotesk.className} text-sm uppercase tracking-wider mb-4`}
                      style={{ color: colors.accent }}>
                      Tech Stack
                    </h3>
                    <div className="space-y-6">
                      {Object.entries(project.skills).map(([category, skills]) => (
                        <div key={category}>
                          <p className={`${inter.className} text-sm mb-2`} style={{ color: `${colors.text}99` }}>
                            {category}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                              <span
                                key={index}
                                className={`${inter.className} px-3 py-1 rounded-full text-sm`}
                                style={{ 
                                  backgroundColor: `${colors.text}22`,
                                  color: colors.text
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>
        );
      })}

      {/* Update the navigation dots to match current section color */}
      {!showMiniProjectsModal && (
        <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-end">
          <div className={`flex flex-col items-end ${activeProject === 'overview' ? 'gap-6' : 'gap-3'}`}>
            {['overview', ...projects.map(p => p.id)].map((id, index) => {
              const project = projects.find(p => p.id === id);
              const colors = id === 'overview' 
                ? { text: '#5D503A' } 
                : domainColors[project?.category];
              
              return (
                <button
                  key={id}
                  onClick={() => {
                    const element = projectRefs[id].current;
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      setActiveProject(id);
                      setVisibleSection(id);
                    }
                  }}
                  className={`group flex items-center gap-3 ${activeProject === 'overview' ? 'cursor-default' : ''}`}
                >
                  <span className={`${inter.className} text-sm transition-all duration-300 ${activeProject === 'overview' ? 'hidden' : 'opacity-0 group-hover:opacity-100'}`}
                    style={{ 
                      color: colors.text
                    }}>
                    {id === 'overview' ? 'Overview' : project?.title}
                  </span>
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150`}
                    style={{ 
                      backgroundColor: visibleSection === id 
                        ? colors.text 
                        : `${colors.text}4D`,
                      transform: visibleSection === id ? 'scale(1.5)' : 'scale(1)'
                    }} />
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Update scroll progress bar colors based on current section */}
      <div className="fixed left-0 top-0 h-1 w-full z-50"
        style={{ 
          backgroundColor: visibleSection === 'overview' 
            ? '#5D503A20' 
            : `${domainColors[projects.find(p => p.id === visibleSection)?.category]?.text}20` 
        }}>
        <motion.div 
          className="h-full"
          style={{ 
            backgroundColor: visibleSection === 'overview' 
              ? '#5D503A' 
              : domainColors[projects.find(p => p.id === visibleSection)?.category]?.text,
            scaleX: scrollProgress / 100,
            transformOrigin: '0%'
          }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
} 