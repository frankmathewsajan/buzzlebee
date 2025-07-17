'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { ArrowUpCircle, ArrowDownCircle } from '@geist-ui/icons';
import Image from 'next/image';
import { Space_Grotesk, Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PortfolioMap from '../components/PortfolioMap';

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
  const [isScrolling, setIsScrolling] = useState(false);

  const projects = [
    {
      id: 'helmet-system',
      title: "Intelligent Safety Helmet System",
      category: "IoT/Embedded Systems",
      timeline: "Jan 2024 - Mar 2024",
      role: "Lead Developer & Hardware Engineer",
      description: "A real-time hazard detection helmet with GPS tracking and emergency communication capabilities. The system provides immediate alerts and location data in emergency situations.",
      achievements: "Secured S-Grade in Engineering Clinics and 1st Prize at HackAP Transport and Logistics Hackathon",
      tags: ["IoT", "GPS", "Embedded Systems", "Real-time Monitoring"],
      skills: {
        "Hardware": ["Arduino", "Sensors", "GPS Module"],
        "Software": ["C++", "Python", "MQTT"],
        "Tools": ["Arduino IDE", "ThingSpeak", "Fusion 360"]
      },
      links: {
        demo: "#",
        github: "#",
        caseStudy: "/case-studies/helmet-system"
      }
    },
    {
      id: 'st-gd-convent',
      title: "St. G. D. Convent School Platform",
      category: "Full-stack Development",
      timeline: "2024",
      role: "Full Stack Developer",
      description: "Full-featured educational platform for St. G. D. Convent School, Agra, UP with comprehensive backend using Supabase for complete school administration management.",
      achievements: "Successfully deployed and certified platform serving real school administration needs",
      tags: ["Next.js", "Supabase", "React", "PostgreSQL", "Education"],
      skills: {
        "Frontend": ["Next.js", "React", "TailwindCSS"],
        "Backend": ["Supabase", "PostgreSQL", "REST APIs"],
        "Tools": ["Git", "Vercel", "Firebase"]
      },
      links: {
        demo: "https://stgdconventschool.com/",
        github: "#",
        caseStudy: "/case-studies/st-gd-convent"
      }
    },
    {
      id: 'banking-sim',
      title: "Digital Banking Simulation System",
      category: "Full-stack Development",
      timeline: "Sep 2023 - Oct 2023",
      role: "Full Stack Developer",
      description: "A gamified banking system inspired by Monopoly's 'Ultimate Banking', featuring real-time balance updates and transaction history.",
      achievements: "Successfully implemented real-time transaction processing and intuitive UI design",
      tags: ["JavaScript", "UI/UX", "Real-time Updates", "Banking Simulation"],
      skills: {
        "Frontend": ["HTML5", "CSS3", "JavaScript"],
        "Backend": ["Node.js", "Express", "MongoDB"],
        "Tools": ["Git", "Heroku"]
      },
      links: {
        demo: "#",
        github: "#",
        caseStudy: "/case-studies/banking-sim"
      }
    },
    {
      id: 'library-management',
      title: "Library Management System",
      category: "CS50P Final Project",
      timeline: "2023",
      role: "Full Stack Python Developer",
      description: "A GUI-based Library Management System (LMS) designed to handle primary housekeeping functions of a library. Built as the final project for Harvard's CS50P course, featuring inventory management, member tracking, and automated fine calculations.",
      achievements: "Perfect score in CS50P final project evaluation",
      tags: ["Python", "GUI", "Database", "Library Systems"],
      skills: {
        "Frontend": ["Tkinter", "CustomTkinter"],
        "Backend": ["Python", "SQLite"],
        "Features": ["Barcode Integration", "Fine Calculator", "Report Generation"]
      },
      links: {
        demo: "#",
        github: "#",
        caseStudy: "/case-studies/library-management"
      },
      relatedMiniProjects: [
        { name: "Indoor Voice", tech: "Python" },
        { name: "Deep Thought", tech: "Python" },
        { name: "Camel Case", tech: "Python" },
        { name: "Outdated", tech: "Python" },
        { name: "Adieu, Adieu", tech: "Python" },
        { name: "Back to the Bank", tech: "Python" },
        { name: "Lines of Code", tech: "Python" },
        { name: "Regular, um, Expressions", tech: "Python" },
        { name: "Cookie Jar", tech: "Python" }
      ]
    },
    {
      id: 'hss-manager',
      title: "HSSManager",
      category: "CS50W Final Project",
      timeline: "2023",
      role: "Full Stack Web Developer",
      description: "A modernized version of legacy software used across schools in Kerala, India. Streamlines student and administration management with modern web technologies and user-friendly interfaces.",
      achievements: "Successfully deployed in 3 pilot schools",
      tags: ["Web Development", "Education", "Management System"],
      skills: {
        "Frontend": ["React", "TailwindCSS"],
        "Backend": ["Django", "PostgreSQL"],
        "DevOps": ["Docker", "Nginx"]
      },
      links: {
        demo: "#",
        github: "#",
        caseStudy: "/case-studies/hss-manager"
      },
      relatedMiniProjects: [
        { name: "Search", tech: "HTML, CSS" },
        { name: "Wiki", tech: "Django" },
        { name: "Commerce", tech: "Django" },
        { name: "Mail", tech: "Django, JavaScript" },
        { name: "Network", tech: "Django, JavaScript" }
      ]
    }
  ];

  const categories = {
    "IoT/Embedded": ["helmet-system"],
    "Full Stack": ["st-gd-convent", "banking-sim"],
    "Course Projects": ["library-management", "hss-manager"]
  };

  const overviewRef = useRef(null);
  const helmetSystemRef = useRef(null);
  const stGdConventRef = useRef(null);
  const bankingSimRef = useRef(null);
  const libraryManagementRef = useRef(null);
  const hssManagerRef = useRef(null);

  const projectRefs = useMemo(() => ({
    overview: overviewRef,
    'helmet-system': helmetSystemRef,
    'st-gd-convent': stGdConventRef,
    'banking-sim': bankingSimRef,
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
      setIsScrolling(true);
      
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        
        const sections = Object.keys(projectRefs);
        const sectionElements = sections.map(id => document.getElementById(id));
        
        // Find the current section based on viewport visibility
        const currentSection = sectionElements.find(element => {
          if (!element) return false;
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // Calculate how much of the section is visible
          const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
          const sectionHeight = Math.max(1, rect.height); // Prevent division by zero
          const visibilityPercentage = (visibleHeight / sectionHeight) * 100;
          
          // If more than 75% of the section is visible, consider it the current section
          return visibilityPercentage > 75;
        });

        if (currentSection) {
          setActiveProject(currentSection.id);
        }

        // Calculate scroll progress with bounds checking
        const totalHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const currentScroll = Math.max(0, Math.min(window.scrollY, totalHeight));
        const progress = (currentScroll / totalHeight) * 100;
        setScrollProgress(progress);
      }, 150);
    };

    const handleWheel = (e) => {
      if (isScrolling) return;
      
      e.preventDefault();
      
      const sections = Object.keys(projectRefs);
      const currentIndex = sections.indexOf(activeProject);
      
      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        const nextSection = projectRefs[sections[currentIndex + 1]].current;
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.deltaY < 0 && currentIndex > 0) {
        const prevSection = projectRefs[sections[currentIndex - 1]].current;
        if (prevSection) {
          prevSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [activeProject, isScrolling, projectRefs]);

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
      rootMargin: '-50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSection(entry.target.id);
        }
      });
    }, options);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

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
                      projectRefs[sections[currentIndex + 1]].current?.scrollIntoView({ behavior: 'smooth' });
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
                    projectRefs[id].current?.scrollIntoView({ behavior: 'smooth' });
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
                      backgroundColor: activeProject === id 
                        ? colors.text 
                        : `${colors.text}4D`,
                      transform: activeProject === id ? 'scale(1.5)' : 'scale(1)'
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