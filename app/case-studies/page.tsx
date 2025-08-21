"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import PortfolioMap from "../components/PortfolioMap";
import { CaseStudy } from "../../types";

import caseStudiesData from "../case-studies.json";

const caseStudies = caseStudiesData.filter((caseStudy) => !caseStudy.hidden);

export default function CaseStudiesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const studiesPerPage = 4;
  const totalPages = Math.ceil(caseStudies.length / studiesPerPage);
  
  const currentStudies = caseStudies.slice(
    (currentPage - 1) * studiesPerPage,
    currentPage * studiesPerPage
  );

  return (
    <>
      <PortfolioMap />
      
      <div className="min-h-screen bg-gradient-to-br from-[#FFEBD0] via-[#FDF6E3] to-[#FFF8E1] py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[#1A365D] mb-6">
              Case Studies
            </h1>
            <p className="text-xl text-[#1A365D]/60 max-w-3xl mx-auto">
              Deep dives into real-world projects, exploring challenges, solutions, and lessons learned.
            </p>
          </motion.div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentStudies.map((caseStudy, index) => (
                <Link href={`/case-studies/${caseStudy.id}`} key={caseStudy.id}>
                  <motion.div
                    className="group relative bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[#1A365D]">
                          {caseStudy.category}
                        </span>
                      </div>

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                          {caseStudy.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#1A365D] mb-3 group-hover:text-[#2D5A7B] transition-colors">
                        {caseStudy.title}
                      </h3>
                      <p className="text-[#1A365D]/60 text-sm mb-4 line-clamp-3">
                        {caseStudy.summary}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {caseStudy.technologies && caseStudy.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-xs px-3 py-1 rounded-full bg-[#1A365D]/10 text-[#1A365D]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-[#1A365D]/50">{caseStudy.readTime}</span>
                        {caseStudy.liveUrl && (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            Live Project
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    currentPage === page
                      ? "bg-[#1A365D] text-[#FFEBD0]"
                      : "bg-[#1A365D]/10 text-[#1A365D] hover:bg-[#1A365D]/20"
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
