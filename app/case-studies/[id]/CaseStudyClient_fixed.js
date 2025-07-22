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
              The development methodology employed for the School Verse Portal follows modern software development practices, 
              incorporating agile principles, user-centered design, and comprehensive testing strategies.
            </p>

            <div className="prose prose-lg max-w-none">
              {caseStudy.methodology.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="mb-8"
                >
                  <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-4`}>
                    {index + 1}. {phase.title}
                  </h3>
                  <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed`}>
                    {phase.content}
                  </p>
                  <p className={`${inter.className} text-sm text-[#5D503A]/60 mt-2`}>
                    <strong>Duration:</strong> {phase.duration}
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
            <p className={`${inter.className} text-[#5D503A]/70 text-lg leading-relaxed mb-12`}>
              The implementation phase involved systematic development of both frontend user interfaces and backend 
              infrastructure, following modern web development best practices and ensuring scalability, security, and maintainability.
            </p>

            {/* System Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                System Architecture
              </h3>
              <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-lg`}>
                {caseStudy.implementation.architecture}
              </p>
            </motion.div>

            {/* Technologies Used */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                Technologies Used
              </h3>
              <div className="space-y-6">
                {caseStudy.implementation.technologies.map((tech, index) => (
                  <div key={index} className="border-l-4 border-[#5D503A] pl-6">
                    <h4 className={`${spaceGrotesk.className} text-lg text-[#5D503A] mb-2 font-semibold`}>
                      {tech.name}
                    </h4>
                    <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed`}>
                      {tech.purpose}
                    </p>
                  </div>
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
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                Key Features
              </h3>
              <div className="space-y-8">
                {caseStudy.implementation.features.map((feature, index) => (
                  <div key={index}>
                    <h4 className={`${spaceGrotesk.className} text-xl text-[#5D503A] mb-3 font-semibold`}>
                      {feature.feature}
                    </h4>
                    <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed`}>
                      {feature.description}
                    </p>
                  </div>
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
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                Challenges & Solutions
              </h3>
              <div className="space-y-8">
                {caseStudy.implementation.challenges.map((item, index) => (
                  <div key={index}>
                    <h4 className={`${spaceGrotesk.className} text-lg text-red-600 mb-2 font-semibold`}>
                      Challenge: {item.challenge}
                    </h4>
                    <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed`}>
                      <strong className="text-green-600">Solution:</strong> {item.solution}
                    </p>
                  </div>
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
              The School Verse Portal has successfully delivered a comprehensive educational management platform that 
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
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-8`}>
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
                    className="text-center"
                  >
                    <div className={`${spaceGrotesk.className} text-3xl text-[#5D503A] mb-2 font-bold`}>
                      {value}
                    </div>
                    <div className={`${inter.className} text-sm text-[#5D503A]/70 font-medium`}>
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
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                Key Achievements
              </h3>
              <div className="space-y-4">
                {caseStudy.results.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className={`${inter.className} text-[#5D503A]/80 leading-relaxed`}>
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
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                Project Impact
              </h3>
              <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-lg`}>
                {caseStudy.results.impact}
              </p>
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
              <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-lg mb-8`}>
                {caseStudy.conclusion}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                Future Work & Recommendations
              </h3>
              <div className="space-y-4">
                {caseStudy.futureWork.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 bg-[#5D503A]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[#5D503A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <span className={`${inter.className} text-[#5D503A]/80 leading-relaxed`}>
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
