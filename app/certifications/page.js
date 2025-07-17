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

export default function Certifications() {
  const [activeCert, setActiveCert] = useState('overview');
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [visibleSection, setVisibleSection] = useState('overview');
  const [isScrolling, setIsScrolling] = useState(false);

  const certifications = [
    {
      id: 'hackathon1',
      title: "Global AI Hackathon 2023",
      category: "Participation",
      date: "2023",
      issuer: "TechCrunch",
      description: "Participated in a 48-hour AI development challenge, developing innovative solutions for healthcare sector.",
      credential: "GAH-2023-001",
      skills: {
        "AI/ML": ["Machine Learning", "Deep Learning", "NLP"],
        "Development": ["Rapid Prototyping", "Team Collaboration", "Problem Solving"],
        "Domain": ["Healthcare Tech", "Data Analysis", "User Research"]
      },
      links: {
        verify: "https://verify.techcrunch.com/hack/001"
      }
    },
    {
      id: 'hackathon2',
      title: "Web3 Builders Summit",
      category: "Participation",
      date: "2023",
      issuer: "ETHGlobal",
      description: "Blockchain and Web3 development competition focusing on decentralized applications and smart contracts.",
      credential: "WBS-2023-002",
      skills: {
        "Blockchain": ["Smart Contracts", "Solidity", "Web3.js"],
        "Development": ["DApp Development", "Security", "Testing"],
        "Tools": ["Hardhat", "Truffle", "MetaMask"]
      },
      links: {
        verify: "https://verify.ethglobal.com/hack/002"
      }
    },
    {
      id: 'django',
      title: "Django Certified Developer",
      category: "Technical",
      date: "2023",
      issuer: "Django Software Foundation",
      description: "Advanced certification in Django web framework development, covering core concepts, security, and best practices.",
      credential: "DCD-2023-1234",
      skills: {
        "Core": ["Python", "Django", "REST APIs"],
        "Database": ["PostgreSQL", "ORM", "Migrations"],
        "Security": ["Authentication", "Authorization", "CSRF Protection"]
      },
      links: {
        verify: "https://verify.djangoproject.com/cert/1234"
      }
    },
    {
      id: 'nextjs',
      title: "Next.js Professional",
      category: "Technical",
      date: "2023",
      issuer: "Vercel",
      description: "Expert-level certification in Next.js framework, focusing on performance optimization and modern web development practices.",
      credential: "NEXT-2023-5678",
      skills: {
        "Frontend": ["React", "Next.js", "TypeScript"],
        "Performance": ["SSR", "SSG", "ISR"],
        "Deployment": ["Vercel", "Edge Functions", "Image Optimization"]
      },
      links: {
        verify: "https://verify.vercel.com/cert/5678"
      }
    },
    {
      id: 'docker',
      title: "Docker Certified Associate",
      category: "Professional",
      date: "2023",
      issuer: "Docker Inc.",
      description: "Professional containerization and orchestration certification covering Docker and container best practices.",
      credential: "DCA-2023-3456",
      skills: {
        "Containerization": ["Docker", "Docker Compose", "Multi-stage Builds"],
        "Orchestration": ["Swarm", "Kubernetes", "Service Discovery"],
        "Security": ["Image Security", "Network Security", "Secrets Management"]
      },
      links: {
        verify: "https://verify.docker.com/cert/3456"
      }
    },
    {
      id: 'tensorflow',
      title: "TensorFlow Developer",
      category: "Professional",
      date: "2023",
      issuer: "Google",
      description: "Machine learning and deep learning certification focusing on TensorFlow implementation and model deployment.",
      credential: "TFD-2023-7890",
      skills: {
        "ML": ["TensorFlow", "Keras", "scikit-learn"],
        "Deep Learning": ["Neural Networks", "CNNs", "RNNs"],
        "Deployment": ["TF Serving", "TF Lite", "Model Optimization"]
      },
      links: {
        verify: "https://verify.google.com/cert/7890"
      }
    },
    {
      id: 'win1',
      title: "Best AI Implementation",
      category: "Acheived",
      date: "2023",
      issuer: "AI Summit 2023",
      description: "Awarded for innovative AI solution in healthcare, demonstrating excellence in machine learning implementation.",
      credential: "AI-2023-001",
      skills: {
        "AI/ML": ["Machine Learning", "Deep Learning", "Computer Vision"],
        "Healthcare": ["Medical Imaging", "Patient Data Analysis", "Clinical Decision Support"],
        "Impact": ["Accuracy Improvement", "Cost Reduction", "Patient Outcomes"]
      },
      links: {
        verify: "https://verify.aisummit.com/award/001"
      }
    },
    {
      id: 'win2',
      title: "Top 10 Global Hackers",
      category: "Acheived",
      date: "2023",
      issuer: "Hack the World",
      description: "Recognized among top global hackers for innovative solutions and technical excellence.",
      credential: "HTW-2023-002",
      skills: {
        "Technical": ["Problem Solving", "Innovation", "Rapid Development"],
        "Leadership": ["Team Management", "Project Planning", "Communication"],
        "Impact": ["User Adoption", "Technical Innovation", "Business Value"]
      },
      links: {
        verify: "https://verify.hacktheworld.com/award/002"
      }
    }
  ];

  const categories = {
    "Participation": ["hackathon1", "hackathon2"],
    "Technical": ["django", "nextjs"],
    "Professional": ["docker", "tensorflow"],
    "Acheived": ["win1", "win2"]
  };

  const overviewRef = useRef(null);
  const djangoRef = useRef(null);
  const nextjsRef = useRef(null);
  const reactNativeRef = useRef(null);
  const dockerRef = useRef(null);
  const tensorflowRef = useRef(null);

  const certRefs = useMemo(() => ({
    overview: overviewRef,
    'django': djangoRef,
    'nextjs': nextjsRef,
    'react-native': reactNativeRef,
    'docker': dockerRef,
    'tensorflow': tensorflowRef
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

  const domainColors = {
    'Participation': {
      bg: '#F0F4FF',
      text: '#2e2e2e',
      accent: '#3B82F6'
    },
    'Technical': {
      bg: '#F0FDF4',
      text: '#2e2e2e',
      accent: '#22C55E'
    },
    'Professional': {
      bg: '#FEF3F2',
      text: '#2e2e2e',
      accent: '#EF4444'
    },
    'Acheived': {
      bg: '#FDF4FF',
      text: '#2e2e2e',
      accent: '#D946EF'
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
        
        const sections = Object.keys(certRefs);
        const sectionElements = sections.map(id => document.getElementById(id));
        
        const currentSection = sectionElements.find(element => {
          if (!element) return false;
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
          const sectionHeight = Math.max(1, rect.height);
          const visibilityPercentage = (visibleHeight / sectionHeight) * 100;
          return visibilityPercentage > 75;
        });

        if (currentSection) {
          setActiveCert(currentSection.id);
        }

        const totalHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const currentScroll = Math.max(0, Math.min(window.scrollY, totalHeight));
        const progress = (currentScroll / totalHeight) * 100;
        setScrollProgress(progress);
      }, 150);
    };

    const handleWheel = (e) => {
      if (isScrolling) return;
      
      e.preventDefault();
      
      const sections = Object.keys(certRefs);
      const currentIndex = sections.indexOf(activeCert);
      
      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        const nextSection = certRefs[sections[currentIndex + 1]].current;
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.deltaY < 0 && currentIndex > 0) {
        const prevSection = certRefs[sections[currentIndex - 1]].current;
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
  }, [activeCert, isScrolling, certRefs]);

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

  return (
    <div className="min-h-screen">
      {/* Portfolio Explorer Map */}
      <PortfolioMap />
      
      {/* Navigation Links */}
      <div className="fixed top-8 right-8 z-50 flex gap-4">
        {activeCert !== 'overview' && (
          <button
            onClick={() => certRefs.overview.current?.scrollIntoView({ behavior: 'smooth' })}
            className="p-3 rounded-full border border-[#5D503A]/20 hover:border-[#5D503A] text-[#5D503A] hover:text-[#5D503A]/80 transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white/90"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
        {activeCert === 'overview' && (
          <Link 
            href="/"
            className={`${inter.className} px-4 py-2 rounded-full border border-[#5D503A]/20 hover:border-[#5D503A] text-[#5D503A] hover:text-[#5D503A]/80 transition-all duration-200`}
          >
            Return Home
          </Link>
        )}
      </div>

      {/* Overview Section */}
      <section
        id="overview"
        ref={certRefs.overview}
        className="min-h-screen flex items-start relative px-8 bg-gradient-to-br from-[#ece7f0] via-[#e8e2ed] to-[#ece7f0] pt-16"
      >
        <motion.div 
          className="max-w-[90vw] mx-auto w-full"
          initial="hidden"
          animate={visibleSection === 'overview' ? 'visible' : 'exit'}
          variants={fadeInUp}
        >
          <motion.h1 
            className={`${spaceGrotesk.className} text-5xl md:text-7xl leading-none text-[#2e2e2e] mb-12`}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 }
              }
            }}
          >
            Validated<br />Expertise
          </motion.h1>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            variants={sectionVariants}
            initial="hidden"
            animate={visibleSection === 'overview' ? 'visible' : 'exit'}
          >
            {/* Left Column - Participation & Technical Certifications */}
            <motion.div className="space-y-8" variants={sectionVariants}>
              <motion.div className="space-y-4" variants={sectionVariants}>
                <motion.h3 variants={itemVariants} className={`${spaceGrotesk.className} text-base md:text-lg text-[#2e2e2e] uppercase tracking-wider`}>
                  Participation & Technical
                </motion.h3>
                <motion.div className="space-y-4" variants={staggerContainer}>
                  {certifications.filter(c => c.category === 'Participation' || c.category === 'Technical').map((cert) => (
                    <motion.button
                      key={cert.id}
                      variants={itemVariants}
                      onClick={() => certRefs[cert.id].current?.scrollIntoView({ behavior: 'smooth' })}
                      className="group block text-left w-full"
                    >
                      <div className="flex items-baseline justify-between border-b border-[#2e2e2e]/20 pb-2 group-hover:border-[#2e2e2e] transition-all duration-200"
                        style={{
                          boxShadow: `0 2px 4px -2px ${domainColors[cert.category]?.text}10`,
                        }}
                      >
                        <div className="space-y-0.5">
                          <span className={`${inter.className} text-base text-[#2e2e2e] block`}>{cert.title}</span>
                          <span className={`${inter.className} text-xs text-[#2e2e2e]/60`}>{cert.category}</span>
                        </div>
                        <span className={`${inter.className} text-xs text-[#2e2e2e]/60`}>{cert.date}</span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Professional & Acheived Certifications */}
            <motion.div className="space-y-8" variants={sectionVariants}>
              <motion.div className="space-y-4" variants={sectionVariants}>
                <motion.h3 variants={itemVariants} className={`${spaceGrotesk.className} text-base md:text-lg text-[#2e2e2e] uppercase tracking-wider`}>
                  Professional & Acheived
                </motion.h3>
                <motion.div className="space-y-4" variants={staggerContainer}>
                  {certifications.filter(c => c.category === 'Professional' || c.category === 'Acheived').map((cert) => (
                    <motion.button
                      key={cert.id}
                      variants={itemVariants}
                      onClick={() => certRefs[cert.id].current?.scrollIntoView({ behavior: 'smooth' })}
                      className="group block text-left w-full"
                    >
                      <div className="flex items-baseline justify-between border-b border-[#2e2e2e]/20 pb-2 group-hover:border-[#2e2e2e] transition-all duration-200"
                        style={{
                          boxShadow: `0 2px 4px -2px ${domainColors[cert.category]?.text}10`,
                        }}
                      >
                        <div className="space-y-0.5">
                          <span className={`${inter.className} text-base text-[#2e2e2e] block`}>{cert.title}</span>
                          <span className={`${inter.className} text-xs text-[#2e2e2e]/60`}>{cert.category}</span>
                        </div>
                        <span className={`${inter.className} text-xs text-[#2e2e2e]/60`}>{cert.date}</span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Individual Certification Sections */}
      {certifications.map((cert) => {
        const colors = domainColors[cert.category];
        
        return (
          <section
            key={cert.id}
            id={cert.id}
            ref={certRefs[cert.id]}
            className="min-h-screen flex items-center relative"
            style={{ backgroundColor: colors.bg }}
          >
            <motion.div 
              className="max-w-[90vw] mx-auto w-full px-8 py-16"
              initial="hidden"
              animate={visibleSection === cert.id ? 'visible' : 'exit'}
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
                      {cert.category}
                    </p>
                    <h2 className={`${spaceGrotesk.className} text-6xl`} style={{ color: colors.text }}>
                      {cert.title}
                    </h2>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h3 className={`${spaceGrotesk.className} text-sm uppercase tracking-wider`}
                        style={{ color: colors.accent }}>
                        Overview
                      </h3>
                      <p className={`${inter.className} text-lg`} style={{ color: `${colors.text}CC` }}>
                        {cert.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className={`${spaceGrotesk.className} text-sm uppercase tracking-wider`}
                        style={{ color: colors.accent }}>
                        Credential
                      </h3>
                      <p className={`${inter.className} italic`} style={{ color: colors.text }}>
                        {cert.credential}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={cert.links.verify}
                      className={`${inter.className} px-6 py-2 rounded-full transition-colors duration-200`}
                      style={{ 
                        backgroundColor: colors.text,
                        color: colors.bg
                      }}
                    >
                      Verify Credential
                    </a>
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
                        Issuer
                      </h3>
                      <p className={`${inter.className}`} style={{ color: `${colors.text}CC` }}>
                        {cert.issuer}
                      </p>
                    </div>
                    <div>
                      <h3 className={`${spaceGrotesk.className} text-sm uppercase tracking-wider mb-2`}
                        style={{ color: colors.accent }}>
                        Date
                      </h3>
                      <p className={`${inter.className}`} style={{ color: `${colors.text}CC` }}>
                        {cert.date}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className={`${spaceGrotesk.className} text-sm uppercase tracking-wider mb-4`}
                      style={{ color: colors.accent }}>
                      Skills Demonstrated
                    </h3>
                    <div className="space-y-6">
                      {Object.entries(cert.skills).map(([category, skills]) => (
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

      {/* Navigation Dots */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-end">
        <div className={`flex flex-col items-end ${activeCert === 'overview' ? 'gap-6' : 'gap-3'}`}>
          {['overview', ...certifications.map(c => c.id)].map((id, index) => {
            const cert = certifications.find(c => c.id === id);
            const colors = id === 'overview' 
              ? { text: '#2e2e2e' } 
              : domainColors[cert?.category];
            
            return (
              <button
                key={id}
                onClick={() => {
                  certRefs[id].current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group flex items-center gap-3 ${activeCert === 'overview' ? 'cursor-default' : ''}`}
              >
                <span className={`${inter.className} text-sm transition-all duration-300 ${activeCert === 'overview' ? 'hidden' : 'opacity-0 group-hover:opacity-100'}`}
                  style={{ 
                    color: colors.text
                  }}>
                  {id === 'overview' ? 'Overview' : cert?.title}
                </span>
                <div className={`w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150`}
                  style={{ 
                    backgroundColor: activeCert === id 
                      ? colors.text 
                      : `${colors.text}4D`,
                    transform: activeCert === id ? 'scale(1.5)' : 'scale(1)'
                  }} />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 w-full h-1 bg-opacity-20"
        style={{ 
          backgroundColor: visibleSection === 'overview' 
            ? '#2e2e2e20' 
            : `${domainColors[certifications.find(c => c.id === visibleSection)?.category]?.text}20` 
        }}>
        <motion.div 
          className="h-full"
          style={{ 
            backgroundColor: visibleSection === 'overview' 
              ? '#2e2e2e' 
              : domainColors[certifications.find(c => c.id === visibleSection)?.category]?.text,
            scaleX: scrollProgress / 100,
            transformOrigin: '0%'
          }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
} 