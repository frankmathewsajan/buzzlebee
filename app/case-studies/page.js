'use client';

import { Space_Grotesk, Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

// Font setup
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

// Case studies data
const caseStudies = [
  {
    id: 'agridrone',
    title: "AgriDrone",
    category: "IoT/Agriculture",
    timeline: "Jan 2024 - Mar 2024",
    description: "An autonomous drone system designed for agricultural monitoring and crop health assessment. The system uses computer vision and machine learning to analyze crop conditions and provide actionable insights to farmers.",
    tags: ["IoT", "Computer Vision", "Machine Learning", "Agriculture"]
  },
  {
    id: 'helmet-system',
    title: "Intelligent Safety Helmet System",
    category: "IoT/Industrial Safety",
    timeline: "Jan 2024 - Mar 2024",
    description: "A real-time hazard detection helmet with GPS tracking and emergency communication capabilities. The system provides immediate alerts and location data in emergency situations.",
    tags: ["IoT", "GPS", "Embedded Systems", "Real-time Monitoring"]
  },
  {
    id: 'hss-manager',
    title: "HSSManager",
    category: "Education Management",
    timeline: "2023",
    description: "A modernized version of legacy software used across schools in Kerala, India. Streamlines student and administration management with modern web technologies and user-friendly interfaces.",
    tags: ["Web Development", "Education", "Management System"]
  },
  {
    id: 'banking-sim',
    title: "Digital Banking Simulation System",
    category: "Financial Technology",
    timeline: "Sep 2023 - Oct 2023",
    description: "A gamified banking system inspired by Monopoly's 'Ultimate Banking', featuring real-time balance updates and transaction history.",
    tags: ["JavaScript", "UI/UX", "Real-time Updates", "Banking Simulation"]
  },
  {
    id: 'library-management',
    title: "Library Management System",
    category: "Educational Software",
    timeline: "2023",
    description: "A GUI-based Library Management System (LMS) designed to handle primary housekeeping functions of a library. Built as the final project for Harvard's CS50P course.",
    tags: ["Python", "GUI", "Database", "Library Systems"]
  },
  {
    id: 'ai-ignite',
    title: "AI-Ignite Educational Platform",
    category: "AI/ML",
    timeline: "Nov 2023 - Dec 2023",
    description: "An AI-powered personalized learning platform with adaptive testing modules that adjusts to individual learning patterns and progress.",
    tags: ["AI", "Machine Learning", "EdTech", "Adaptive Learning"]
  },
  {
    id: 'smart-home',
    title: "Smart Home Automation System",
    category: "IoT/Home Automation",
    timeline: "Oct 2023 - Nov 2023",
    description: "A comprehensive home automation system that integrates various IoT devices and provides centralized control through a mobile app.",
    tags: ["IoT", "Mobile App", "Home Automation", "Cloud Integration"]
  },
  {
    id: 'health-tracker',
    title: "Health & Fitness Tracker",
    category: "Health Tech",
    timeline: "Aug 2023 - Sep 2023",
    description: "A wearable device and companion app that tracks vital signs, activity levels, and provides personalized health insights.",
    tags: ["IoT", "Health Tech", "Mobile App", "Data Analytics"]
  }
];

export default function CaseStudies() {
  const [currentPage, setCurrentPage] = useState(1);
  const studiesPerPage = 4;
  const totalPages = Math.ceil(caseStudies.length / studiesPerPage);
  
  const currentStudies = caseStudies.slice(
    (currentPage - 1) * studiesPerPage,
    currentPage * studiesPerPage
  );

  return (
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
              <div key={caseStudy.id} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
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
              </div>
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
  );
} 