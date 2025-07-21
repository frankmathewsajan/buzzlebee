'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Space_Grotesk, Inter } from 'next/font/google';
import PortfolioMap from '../../components/PortfolioMap';
import projectsData from '../../projects.json';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function CaseStudyClient({ id }) {
  const [activeSection, setActiveSection] = useState('intro');
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

      {/* Navigation */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id 
                  ? 'bg-[#5D503A] scale-125' 
                  : 'bg-[#5D503A]/30 hover:bg-[#5D503A]/60'
              }`}
              title={section.label}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section id="intro" className="min-h-screen flex items-center justify-center px-8 py-16">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
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
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
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
      <section id="methodology" className="min-h-screen flex items-center px-8 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl text-[#5D503A] mb-6`}>
              Methodology & Research
            </h2>
            <p className={`${inter.className} text-[#5D503A]/70 max-w-2xl mx-auto text-lg`}>
              A systematic approach to problem-solving and solution development
            </p>
          </motion.div>

          <div className="space-y-12">
            {caseStudy.methodology.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="md:w-1/2">
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#5D503A] text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className={`${spaceGrotesk.className} text-xl text-[#5D503A]`}>
                          {phase.title}
                        </h3>
                        <span className={`${inter.className} text-sm text-[#5D503A]/60`}>
                          {phase.duration}
                        </span>
                      </div>
                    </div>
                    <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed`}>
                      {phase.content}
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="aspect-video bg-gradient-to-br from-[#5D503A]/10 to-[#5D503A]/20 rounded-2xl flex items-center justify-center">
                    <span className={`${inter.className} text-[#5D503A]/60`}>
                      Phase {index + 1} Illustration
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section id="implementation" className="min-h-screen flex items-center px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl text-[#5D503A] mb-6`}>
              Implementation
            </h2>
            <p className={`${inter.className} text-[#5D503A]/70 max-w-2xl mx-auto text-lg`}>
              Technical details and development process
            </p>
          </motion.div>

          <div className="space-y-16">
            {/* Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                System Architecture
              </h3>
              <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-lg`}>
                {caseStudy.implementation.architecture}
              </p>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                Technologies Used
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudy.implementation.technologies.map((tech, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className={`${spaceGrotesk.className} text-lg text-[#5D503A] mb-2`}>
                      {tech.name}
                    </h4>
                    <p className={`${inter.className} text-[#5D503A]/70 text-sm`}>
                      {tech.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            {caseStudy.implementation.features && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                  Key Features
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {caseStudy.implementation.features.map((feature, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                      <h4 className={`${spaceGrotesk.className} text-lg text-[#5D503A] mb-3`}>
                        {feature.feature}
                      </h4>
                      <p className={`${inter.className} text-[#5D503A]/70 text-sm leading-relaxed`}>
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                Challenges & Solutions
              </h3>
              <div className="space-y-6">
                {caseStudy.implementation.challenges.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className={`${spaceGrotesk.className} text-lg text-red-600 mb-2`}>
                          Challenge
                        </h4>
                        <p className={`${inter.className} text-[#5D503A]/80 text-sm`}>
                          {item.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 className={`${spaceGrotesk.className} text-lg text-green-600 mb-2`}>
                          Solution
                        </h4>
                        <p className={`${inter.className} text-[#5D503A]/80 text-sm`}>
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="min-h-screen flex items-center px-8 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl text-[#5D503A] mb-6`}>
              Results & Impact
            </h2>
            <p className={`${inter.className} text-[#5D503A]/70 max-w-2xl mx-auto text-lg`}>
              Measurable outcomes and project achievements
            </p>
          </motion.div>

          <div className="space-y-16">
            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-8 text-center`}>
                Key Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(caseStudy.results.metrics).map(([metric, value], index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center bg-white p-6 rounded-xl shadow-lg"
                  >
                    <div className={`${spaceGrotesk.className} text-3xl text-[#5D503A] mb-2`}>
                      {value}
                    </div>
                    <div className={`${inter.className} text-sm text-[#5D503A]/70`}>
                      {metric}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                Key Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.results.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-white p-4 rounded-lg shadow"
                  >
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className={`${inter.className} text-[#5D503A]/80`}>
                      {achievement}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Impact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-4`}>
                Project Impact
              </h3>
              <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-lg`}>
                {caseStudy.results.impact}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section id="conclusion" className="min-h-screen flex items-center px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl text-[#5D503A] mb-6`}>
              Conclusion
            </h2>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <p className={`${inter.className} text-[#5D503A]/80 leading-relaxed text-lg`}>
                {caseStudy.conclusion}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className={`${spaceGrotesk.className} text-2xl text-[#5D503A] mb-6`}>
                Future Work
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.futureWork.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#5D503A]/10 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#5D503A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                      <span className={`${inter.className} text-[#5D503A]/80`}>
                        {item}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center pt-8"
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
          </div>
        </div>
      </section>
    </div>
  );
}
