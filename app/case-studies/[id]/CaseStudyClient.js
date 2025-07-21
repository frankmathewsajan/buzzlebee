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
      
      {/* Hero Section */}
      <section id="intro" className="min-h-screen flex items-center justify-center px-8 py-16">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
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
        </motion.div>
      </section>

      {/* Navigation buttons */}
      <div className="text-center py-8">
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
      </div>
    </div>
  );
}
