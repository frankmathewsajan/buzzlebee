'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { Space_Grotesk, Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PortfolioMap from '../components/PortfolioMap';
import certifications from '../certifications.json';

// Font setup to match index page
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function Certifications() {
  const [activeCert, setActiveCert] = useState('overview');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSection, setVisibleSection] = useState('overview');

  // Filter out hidden certificates
  const visibleCertifications = useMemo(() => {
    return certifications.filter(cert => !cert.hidden);
  }, []);

  // Create refs at the top level - one for each visible certificate
  const overviewRef = useRef(null);
  const stGdConventRef = useRef(null);
  const cs50pRef = useRef(null);
  const hacksagonRef = useRef(null);

  const certRefs = {
    overview: overviewRef,
    'st-gd-convent-completion': stGdConventRef,
    'cs50p-certificate': cs50pRef,
    'hacksagon-2025': hacksagonRef
  };

  // Group certifications by tags
  const certificationsByTag = useMemo(() => {
    const grouped = {
      skill: [],
      academic: [],
      professional: [],
      wins: [],
      participation: []
    };

    certifications.forEach(cert => {
      cert.tags.forEach(tag => {
        if (grouped[tag]) {
          grouped[tag].push(cert);
        }
      });
    });

    return grouped;
  }, []);

  // Single professional color scheme inspired by Credly
  const brandColors = {
    bg: '#FFFFFF',
    text: '#1A1A1A',
    secondary: '#6B7280',
    accent: '#2563EB',
    border: '#E5E7EB',
    hoverBg: '#F8FAFC',
    cardBg: '#FEFEFE'
  };

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {        
        // Find the section that's most visible in the viewport
        const sections = ['overview', ...certifications.map(c => c.id)];
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
        
        if (currentSection !== activeCert) {
          setActiveCert(currentSection);
          setVisibleSection(currentSection);
        }

        // Update scroll progress
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(100, (window.scrollY / Math.max(1, totalHeight)) * 100);
        setScrollProgress(progress);
      }, 100);
    };

    // Initial scroll calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [activeCert]);

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
        setActiveCert(sectionId);
      }
    }, options);

    // Observe all sections
    const sections = ['overview', ...certifications.map(c => c.id)];
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
      
      {/* Back to Top Button - Moved to bottom right */}
      {activeCert !== 'overview' && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => certRefs.overview.current?.scrollIntoView({ behavior: 'smooth' })}
            className="p-3 rounded-full border border-[#E5E7EB] hover:border-[#2563EB] text-[#6B7280] hover:text-[#2563EB] transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-lg"
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
        ref={certRefs.overview}
        className="min-h-screen flex items-start relative px-8 bg-gradient-to-br from-[#FAF5EE] via-[#F8F2E9] to-[#FAF5EE] pt-20"
      >
        <motion.div 
          className="max-w-6xl mx-auto w-full"
          initial="hidden"
          animate={visibleSection === 'overview' ? 'visible' : 'exit'}
          variants={fadeInUp}
        >
          <motion.div 
            className="mb-16"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut' }
              }
            }}
          >
            <h1 className={`${spaceGrotesk.className} text-5xl md:text-6xl font-medium leading-tight text-[#1A1A1A] mb-4`}>
              Certifications
            </h1>
            <p className={`${inter.className} text-lg text-[#6B7280] max-w-2xl`}>
              Verified credentials and achievements demonstrating expertise across multiple domains.
            </p>
          </motion.div>
          
          {/* Certificate Table of Contents - 2 per row */}
          <motion.div
            className="space-y-8"
            variants={sectionVariants}
            initial="hidden"
            animate={visibleSection === 'overview' ? 'visible' : 'exit'}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visibleCertifications.map((cert, index) => (
                <motion.button
                  key={cert.id}
                  variants={itemVariants}
                  onClick={() => {
                    const element = certRefs[cert.id]?.current;
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      setActiveCert(cert.id);
                      setVisibleSection(cert.id);
                    }
                  }}
                  className="group flex items-center gap-6 p-6 rounded-lg border border-[#E5E7EB] hover:border-[#2563EB] transition-all duration-300 bg-white hover:bg-[#F8FAFC] text-left w-full"
                >
                  {/* Tiny Certificate Preview */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-16 bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] rounded border border-[#E5E7EB] overflow-hidden">
                      {cert.image && cert.image !== false ? (
                        <Image
                          src={`/images/certifications/${cert.image}`}
                          alt={`${cert.title} Certificate`}
                          width={80}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="fas fa-certificate text-[#6B7280] text-xl"></i>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Certificate Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`${inter.className} text-base font-semibold text-[#1A1A1A] group-hover:text-[#2563EB] transition-colors mb-1`}>
                      {cert.title}
                    </h3>
                    <p className={`${inter.className} text-sm text-[#6B7280] mb-2`}>
                      {cert.issuer}
                    </p>
                    <div className={`${inter.className} flex items-center gap-4 text-sm text-[#6B7280]`}>
                      <span>{cert.issueDate}</span>
                      <span>•</span>
                      <span className="capitalize">{cert.category}</span>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-[#6B7280] group-hover:text-[#2563EB] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Individual Certificate Sections */}
      {visibleCertifications.map((cert) => (
        <section
          key={cert.id}
          id={cert.id}
          ref={certRefs[cert.id]}
          className="min-h-screen flex items-start relative px-8 bg-gradient-to-br from-[#FAF5EE] via-[#F8F2E9] to-[#FAF5EE] pt-20"
        >
          <motion.div
            className="max-w-6xl mx-auto w-full"
            initial="hidden"
            animate={visibleSection === cert.id ? 'visible' : 'exit'}
            variants={fadeInUp}
          >
            {/* Certificate Header */}
            <div className="flex flex-col lg:flex-row gap-12 mb-16">
              {/* Bigger Certificate Preview */}
              <div className="flex-shrink-0">
                <div className="w-[600px] h-[450px] bg-gradient-to-br from-[#F8FAFC] to-[#F3F4F6] rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xl">
                  {cert.image && cert.image !== false ? (
                    <Image
                      src={`/images/certifications/${cert.image}`}
                      alt={`${cert.title} Certificate`}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-center text-[#6B7280] p-12">
                      <div>
                        <i className="fas fa-certificate text-8xl mx-auto mb-6 text-[#6B7280]"></i>
                        <h3 className={`${spaceGrotesk.className} text-2xl font-medium text-[#1A1A1A] mb-3`}>
                          {cert.title}
                        </h3>
                        <p className={`${inter.className} text-lg text-[#6B7280]`}>
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Certificate Details */}
              <div className="flex-1 space-y-8">
                <div>
                  <h1 className={`${spaceGrotesk.className} text-3xl md:text-4xl font-medium leading-tight text-[#1A1A1A] mb-4`}>
                    {cert.title}
                  </h1>
                  <p className={`${inter.className} text-lg text-[#6B7280] mb-6`}>
                    {cert.description}
                  </p>
                </div>

                {/* Certificate Meta - Very small text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className={`${inter.className} text-xs font-medium text-[#374151] uppercase tracking-wide mb-2`}>
                      Issuing Organization
                    </h3>
                    <p className={`${inter.className} text-sm text-[#1A1A1A]`}>
                      {cert.issuer}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className={`${inter.className} text-xs font-medium text-[#374151] uppercase tracking-wide mb-2`}>
                      Issue Date
                    </h3>
                    <p className={`${inter.className} text-sm text-[#1A1A1A]`}>
                      {cert.issueDate}
                    </p>
                  </div>

                  <div>
                    <h3 className={`${inter.className} text-xs font-medium text-[#374151] uppercase tracking-wide mb-2`}>
                      Category
                    </h3>
                    <p className={`${inter.className} text-sm text-[#1A1A1A] capitalize`}>
                      {cert.category}
                    </p>
                  </div>

                  {cert.verificationLink && (
                    <div>
                      <h3 className={`${inter.className} text-xs font-medium text-[#374151] uppercase tracking-wide mb-2`}>
                        Verification
                      </h3>
                      <a
                        href={cert.verificationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${inter.className} inline-flex items-center gap-1 text-[#2563EB] hover:text-[#1D4ED8] transition-colors text-sm`}
                      >
                        Verify Certificate
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>

                {/* Skills & Tags - Very small */}
                {cert.skills && cert.skills.length > 0 && (
                  <div>
                    <h3 className={`${inter.className} text-xs font-medium text-[#374151] uppercase tracking-wide mb-3`}>
                      Skills Demonstrated
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`${inter.className} px-2 py-1 bg-[#F3F4F6] text-[#374151] rounded text-xs`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Details - Very small */}
                {cert.details && (
                  <div className="bg-white rounded p-4 border border-[#E5E7EB]">
                    <h3 className={`${inter.className} text-xs font-medium text-[#1A1A1A] mb-2`}>
                      Achievement Details
                    </h3>
                    <p className={`${inter.className} text-xs text-[#374151] leading-relaxed`}>
                      {cert.details}
                    </p>
                  </div>
                )}

                {/* Credential ID - Very small */}
                {cert.credential && (
                  <div className="bg-white rounded p-4 border border-[#E5E7EB]">
                    <h3 className={`${inter.className} text-xs font-medium text-[#374151] uppercase tracking-wide mb-2`}>
                      Credential ID
                    </h3>
                    <p className="font-mono text-xs text-[#1A1A1A] bg-[#FAF5EE] px-2 py-1 rounded">
                      {cert.credential}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      ))}

      {/* Navigation Dots */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-end">
        <div className="flex flex-col items-end gap-3">
          {['overview', ...visibleCertifications.map(c => c.id)].map((id, index) => {
            const cert = visibleCertifications.find(c => c.id === id);
            
            return (
              <button
                key={id}
                onClick={() => {
                  const element = certRefs[id].current;
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    setActiveCert(id);
                    setVisibleSection(id);
                  }
                }}
                className="group flex items-center gap-3"
              >
                <span className={`${inter.className} text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 text-[#374151]`}>
                  {id === 'overview' ? 'Overview' : cert?.title}
                </span>
                <div className={`w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150 ${
                  visibleSection === id 
                    ? 'bg-[#2563EB] scale-150' 
                    : 'bg-[#D1D5DB] hover:bg-[#9CA3AF]'
                }`} />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-[#F0E6D6]">
        <motion.div 
          className="h-full bg-[#2563EB]"
          style={{ 
            scaleX: scrollProgress / 100,
            transformOrigin: '0%'
          }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
} 