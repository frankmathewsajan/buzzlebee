'use client';

import { Space_Grotesk, Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import PortfolioMap from '../components/PortfolioMap';
import projectsData from '../projects.json';

// Font setup
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

// Extract case studies from projects data
const caseStudies = projectsData
  .filter(project => project.caseStudy) // Only projects with case studies
  .map(project => ({
    id: project.id,
    title: project.title,
    category: project.category,
    timeline: project.timeline,
    description: project.description,
    tags: project.tags
  }));

export default function CaseStudies() {
  const [currentPage, setCurrentPage] = useState(1);
  const studiesPerPage = 4;
  const totalPages = Math.ceil(caseStudies.length / studiesPerPage);
  
  const currentStudies = caseStudies.slice(
    (currentPage - 1) * studiesPerPage,
    currentPage * studiesPerPage
  );

  return (
    <>
      {/* Portfolio Explorer Map */}
      <PortfolioMap />
      
      <style jsx global>{`
        .group\/card:hover ~ .group\/card,
        .group\/card:has(~ .group\/card:hover) {
          opacity: 0.5;
          filter: blur(2px);
          transform: scale(0.98);
        }
        .group\/card:hover {
          opacity: 1;
          filter: blur(0);
          transform: scale(1);
        }
      `}</style>
      <div className="h-screen bg-[#FFEBD0] overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-8 py-8 flex relative">
          {/* Back Button */}
          <Link 
            href="/projects" 
            className="absolute top-8 right-8 z-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${inter.className} px-6 py-2 rounded-full bg-[#1A365D]/10 text-[#1A365D] hover:bg-[#1A365D]/20 transition-colors duration-200`}
            >
              Back to Projects
            </motion.button>
          </Link>

          <div className="flex-1 flex flex-col">
            <motion.div 
              className="max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={`${spaceGrotesk.className} text-4xl md:text-6xl leading-none text-[#1A365D] mb-4`}>
                Case Studies
              </h1>
              <p className={`${inter.className} text-sm text-[#1A365D]/60 leading-relaxed font-light max-w-[400px] text-justify`}>
                Detailed technical case studies showcasing my solutions & their measurable impact across various domains.
              </p>
            </motion.div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              {/* Cross Separator */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-[#1A365D]/20"></div>
                <div className="absolute w-[1px] h-full bg-[#1A365D]/20"></div>
              </div>

              {currentStudies.map((caseStudy, index) => (
                <Link 
                  href={`/case-studies/${caseStudy.id}`}
                  key={caseStudy.id}
                  className="relative block transition-all duration-300 group/card"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="h-full flex flex-col space-y-4">
                      <div className="space-y-2">
                        <p className={`${inter.className} text-sm text-[#1A365D]`}>
                          {caseStudy.category}
                        </p>
                        <h2 className={`${spaceGrotesk.className} text-xl md:text-2xl text-[#1A365D] group-hover:text-[#1A365D]/80 transition-colors duration-200`}>
                          {caseStudy.title}
                        </h2>
                        <p className={`${inter.className} text-sm text-[#1A365D]/60`}>
                          {caseStudy.timeline}
                        </p>
                      </div>

                      <p className={`${inter.className} text-sm text-[#1A365D]/80 leading-relaxed line-clamp-3`}>
                        {caseStudy.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {caseStudy.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`${inter.className} text-xs px-3 py-1 rounded-full bg-[#1A365D]/10 text-[#1A365D]`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Vertical Pagination */}
          {totalPages > 1 && (
            <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-[#1A365D] text-[#FFEBD0]'
                      : 'bg-[#1A365D]/10 text-[#1A365D] hover:bg-[#1A365D]/20'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 