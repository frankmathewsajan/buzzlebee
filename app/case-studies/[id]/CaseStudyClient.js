'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Space_Grotesk, Inter } from 'next/font/google';
import PortfolioMap from '../../components/PortfolioMap';
import projectsData from '../../projects.json';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function CaseStudyClient({ id }) {
  const [activeSection, setActiveSection] = useState('intro');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progressBarHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'methodology', 'implementation', 'results', 'conclusion'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find the project that matches this case study ID
  const project = projectsData.find(p => p.id === id);
  const caseStudy = project?.caseStudy;

  if (!project || !caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF5EE]">
        <div className="text-center">
          <h1 className={`${spaceGrotesk.className} text-4xl text-[#5D503A] mb-4`}>
            Case Study Not Found
          </h1>
          <Link href="/case-studies" className="text-[#5D503A] underline">
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'intro', label: 'Introduction' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'implementation', label: 'Implementation' },
    { id: 'results', label: 'Results' },
    { id: 'conclusion', label: 'Conclusion' }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAF5EE]">
      <PortfolioMap />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-1 bg-[#5D503A]/20 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
      >
        <motion.div 
          className="h-full bg-[#5D503A] origin-left"
          style={{ height: progressBarHeight }}
        />
      </motion.div>

      {/* Bottom Right Navigation */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="relative">
          <AnimatePresence>
            {isNavOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-16 right-0 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-[#5D503A]/10 overflow-hidden min-w-[160px]"
              >
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    onClick={() => {
                      document.getElementById(section.id)?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                      setIsNavOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-[#5D503A]/10 transition-colors duration-200 flex items-center gap-3 ${
                      activeSection === section.id 
                        ? 'bg-[#5D503A]/10 border-r-2 border-[#5D503A]' 
                        : ''
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeSection === section.id 
                        ? 'bg-[#5D503A] scale-125' 
                        : 'bg-[#5D503A]/30'
                    }`} />
                    <span className={`${inter.className} text-sm font-medium text-[#5D503A]`}>
                      {section.label}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsNavOpen(!isNavOpen)}
            onMouseEnter={() => setIsNavOpen(true)}
            onMouseLeave={() => setIsNavOpen(false)}
            className="bg-white/90 backdrop-blur-md text-[#5D503A] rounded-full shadow-xl border border-[#5D503A]/10 px-4 py-3 flex items-center gap-3 hover:bg-white transition-all duration-200 min-w-[140px] justify-between"
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-[#5D503A]`} />
              <span className={`${inter.className} text-sm font-medium`}>
                {sections.find(s => s.id === activeSection)?.label || 'Navigation'}
              </span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Hero Section */}
      <section id="intro" className="min-h-screen flex items-center justify-center px-8 py-16">
        <motion.div 
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className={`${inter.className} text-sm text-[#5D503A]/60`}>
                {project.category}
              </span>
              <span className="w-px h-4 bg-[#5D503A]/30" />
              <span className={`${inter.className} text-sm text-[#5D503A]/60`}>
                {project.timeline}
              </span>
              <span className="w-px h-4 bg-[#5D503A]/30" />
              <span className={`${inter.className} text-sm text-[#5D503A]/60`}>
                {caseStudy.readTime}
              </span>
            </div>
          </motion.div>

          <motion.h1 
            className={`${spaceGrotesk.className} text-4xl md:text-6xl lg:text-7xl text-[#5D503A] mb-8 leading-tight`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {project.title}
          </motion.h1>

          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {project.tags.map((skill, index) => (
              <span
                key={index}
                className={`${inter.className} px-4 py-2 bg-[#5D503A]/10 text-[#5D503A] rounded-full text-sm`}
              >
                {skill}
              </span>
            ))}
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div>
              <h3 className={`${spaceGrotesk.className} text-lg text-[#5D503A] mb-3`}>
                Objective
              </h3>
              <p className={`${inter.className} text-[#5D503A]/70 text-sm leading-relaxed`}>
                {caseStudy.objective}
              </p>
            </div>
            <div>
              <h3 className={`${spaceGrotesk.className} text-lg text-[#5D503A] mb-3`}>
                Aim
              </h3>
              <p className={`${inter.className} text-[#5D503A]/70 text-sm leading-relaxed`}>
                {caseStudy.aim}
              </p>
            </div>
            <div>
              <h3 className={`${spaceGrotesk.className} text-lg text-[#5D503A] mb-3`}>
                Background
              </h3>
              <p className={`${inter.className} text-[#5D503A]/70 text-sm leading-relaxed`}>
                {caseStudy.history}
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="flex justify-center">
              <button 
                onClick={() => document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' })}
                className="animate-bounce"
              >
                <svg className="w-6 h-6 text-[#5D503A]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="px-8 py-16 bg-white/30">
        <div className="max-w-8xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl text-[#5D503A] mb-8`}>
              Methodology
            </h2>
            <p className={`${inter.className} text-[#5D503A]/70 text-lg leading-relaxed mb-12`}>
              The development methodology employed for the St. G. D. Convent School Platform follows modern software development practices, 
              incorporating agile principles, user-centered design, and comprehensive testing strategies.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {caseStudy.methodology.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#5D503A]/10 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#5D503A] to-[#5D503A]/80 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className={`${spaceGrotesk.className} text-xl text-[#5D503A] mb-2 font-semibold`}>
                        {phase.title}
                      </h3>
                      <span className={`${inter.className} text-sm text-[#5D503A]/60 bg-[#5D503A]/5 px-3 py-1 rounded-full`}>
                        {phase.duration}
                      </span>
                    </div>
                  </div>
                  <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-justify`}>
                    {phase.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Implementation Section */}
      <section id="implementation" className="px-8 py-16">
        <div className="max-w-8xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl text-[#5D503A] mb-8`}>
              Implementation
            </h2>
            <p className={`${inter.className} text-[#5D503A]/70 text-lg leading-relaxed mb-12 text-justify`}>
              The implementation phase involved systematic development of both frontend user interfaces and backend 
              infrastructure, following modern web development best practices and ensuring scalability, security, and maintainability.
            </p>

            {/* System Architecture Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-lg border border-[#5D503A]/10"
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6 font-semibold flex items-center gap-3`}>
                <div className="w-8 h-8 bg-gradient-to-br from-[#5D503A] to-[#5D503A]/80 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"/>
                  </svg>
                </div>
                System Architecture
              </h3>
              <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-lg text-justify`}>
                {caseStudy.implementation.architecture}
              </p>
            </motion.div>

            {/* Technologies Used Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-8 font-semibold flex items-center gap-3`}>
                <div className="w-8 h-8 bg-gradient-to-br from-[#5D503A] to-[#5D503A]/80 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
                Technologies Used
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudy.implementation.technologies.map((tech, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#5D503A]/10 hover:shadow-xl transition-all duration-300"
                  >
                    <h4 className={`${spaceGrotesk.className} text-lg text-[#5D503A] mb-3 font-semibold`}>
                      {tech.name}
                    </h4>
                    <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-justify`}>
                      {tech.purpose}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-8 font-semibold flex items-center gap-3`}>
                <div className="w-8 h-8 bg-gradient-to-br from-[#5D503A] to-[#5D503A]/80 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13V12a1 1 0 011-1z"/>
                  </svg>
                </div>
                Key Features Implemented
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {caseStudy.implementation.features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#5D503A]/10 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#5D503A]/10 to-[#5D503A]/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-[#5D503A]/20 group-hover:to-[#5D503A]/10 transition-all duration-300">
                        <div className="w-2 h-2 bg-[#5D503A] rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className={`${spaceGrotesk.className} text-lg text-[#5D503A] font-semibold mb-3`}>
                          {feature.feature}
                        </h4>
                      </div>
                    </div>
                    <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-justify pl-14`}>
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Challenges & Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-8 font-semibold flex items-center gap-3`}>
                <div className="w-8 h-8 bg-gradient-to-br from-[#5D503A] to-[#5D503A]/80 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"/>
                  </svg>
                </div>
                Challenges & Solutions
              </h3>
              <div className="space-y-6">
                {caseStudy.implementation.challenges.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#5D503A]/10 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center">
                          <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>
                          </svg>
                        </div>
                        <h4 className={`${spaceGrotesk.className} text-lg text-red-700 font-semibold`}>
                          Challenge
                        </h4>
                      </div>
                      <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-justify mb-4 pl-9`}>
                        {item.challenge}
                      </p>
                    </div>
                    
                    <div className="border-t border-[#5D503A]/10 pt-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                          </svg>
                        </div>
                        <h4 className={`${spaceGrotesk.className} text-lg text-green-700 font-semibold`}>
                          Solution
                        </h4>
                      </div>
                      <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-justify pl-9`}>
                        {item.solution}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="px-8 py-16 bg-white/30">
        <div className="max-w-8xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl text-[#5D503A] mb-8`}>
              Results & Impact
            </h2>
            <p className={`${inter.className} text-[#5D503A]/70 text-lg leading-relaxed mb-12`}>
              The St. G. D. Convent School Platform has successfully delivered a comprehensive educational management platform that 
              exceeds initial expectations and requirements across all key performance metrics.
            </p>

            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-8 font-semibold flex items-center gap-3`}>
                <div className="w-8 h-8 bg-gradient-to-br from-[#5D503A] to-[#5D503A]/80 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                  </svg>
                </div>
                Performance Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {Object.entries(caseStudy.results.metrics).map(([metric, value], index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-[#5D503A]/10 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className={`${spaceGrotesk.className} text-3xl text-[#5D503A] mb-3 font-bold group-hover:scale-105 transition-transform duration-300`}>
                      {value}
                    </div>
                    <div className={`${inter.className} text-sm text-[#5D503A]/70 font-medium leading-tight`}>
                      {metric}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Key Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-8 font-semibold flex items-center gap-3`}>
                <div className="w-8 h-8 bg-gradient-to-br from-[#5D503A] to-[#5D503A]/80 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                </div>
                Key Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.results.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#5D503A]/10 hover:shadow-xl transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-justify flex-1`}>
                      {achievement}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Project Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-8 font-semibold flex items-center gap-3`}>
                <div className="w-8 h-8 bg-gradient-to-br from-[#5D503A] to-[#5D503A]/80 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                Project Impact
              </h3>
              <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-[#5D503A]/10">
                <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-lg text-justify`}>
                  {caseStudy.results.impact}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section id="conclusion" className="px-8 py-16">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl text-[#5D503A] mb-8`}>
              Conclusion
            </h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-[#5D503A]/10">
                <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-lg mb-8 text-justify`}>
                  {caseStudy.conclusion}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-8 font-semibold flex items-center gap-3`}>
                <div className="w-8 h-8 bg-gradient-to-br from-[#5D503A] to-[#5D503A]/80 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"/>
                  </svg>
                </div>
                Future Work & Recommendations
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {caseStudy.futureWork.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#5D503A]/10 hover:shadow-xl transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"/>
                      </svg>
                    </div>
                    <span className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-justify flex-1`}>
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center pt-8 border-t border-[#5D503A]/20"
            >
              <div className="flex justify-center gap-4">
                <Link
                  href="/case-studies"
                  className={`${inter.className} px-6 py-3 bg-[#5D503A] text-white rounded-full hover:bg-[#5D503A]/80 transition-colors duration-200`}
                >
                  Back to Case Studies
                </Link>
                <Link
                  href="/projects"
                  className={`${inter.className} px-6 py-3 border border-[#5D503A] text-[#5D503A] rounded-full hover:bg-[#5D503A]/10 transition-colors duration-200`}
                >
                  View Projects
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
