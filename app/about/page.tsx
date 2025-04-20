'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Back Button */}
      <Link href="/">
        <motion.button
          className="fixed top-4 left-4 p-2 text-[#3E2C41] hover:text-[#2E2E2E] transition-colors z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="p-2 rounded-full border border-[#3E2C41] hover:border-[#2E2E2E] transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </div>
        </motion.button>
      </Link>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-white/50 backdrop-blur-sm rounded-full shadow-sm text-[#3E2C41] hover:text-[#2E2E2E] transition-colors z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showScrollTop ? 1 : 0, y: showScrollTop ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>

      <div 
        ref={containerRef}
        className="h-screen w-full overflow-y-auto snap-y snap-mandatory bg-[#ECE7F0]"
      >
        {/* Section 1: Frank B — Index */}
        <section id="index" className="h-screen w-full snap-start flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl font-serif text-[#2E2E2E] mb-8">Frank Mathew Sajan</h1>
            <nav className="space-y-4">
              <Link href="#origin" className="block text-xl text-[#3E2C41] hover:text-[#2E2E2E] transition-colors">
                Origin
              </Link>
              <Link href="#work" className="block text-xl text-[#3E2C41] hover:text-[#2E2E2E] transition-colors">
                The Work
              </Link>
              <Link href="#future" className="block text-xl text-[#3E2C41] hover:text-[#2E2E2E] transition-colors">
                The Future
              </Link>
            </nav>
          </motion.div>
        </section>

        {/* Section 2: Origin */}
        <section id="origin" className="h-screen w-full snap-start flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-serif text-[#2E2E2E] mb-8">Origin</h2>
            <p className="text-lg text-[#2E2E2E] leading-relaxed mb-4">
              From the earliest days, I found myself drawn to the intersection of technology and human experience. 
              Growing up in a world where digital and physical realities began to merge, I developed a deep curiosity 
              about how we interact with and shape our environment.
            </p>
            <p className="text-lg text-[#2E2E2E] leading-relaxed">
              My education and early experiences laid the foundation for a journey that would take me through 
              various realms of technology, always with a focus on creating meaningful connections and solving 
              complex problems.
            </p>
          </motion.div>
        </section>

        {/* Section 3: The Work */}
        <section id="work" className="h-screen w-full snap-start flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-serif text-[#2E2E2E] mb-8">The Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-serif text-[#3E2C41] mb-2">Experience</h3>
                <p className="text-[#2E2E2E]">Years of building and creating across various domains...</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm"
              >
                <h3 className="text-xl font-serif text-[#3E2C41] mb-2">Projects</h3>
                <p className="text-[#2E2E2E]">Passion projects that push boundaries...</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Section 4: The Future */}
        <section id="future" className="h-screen w-full snap-start flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-serif text-[#2E2E2E] mb-8">The Future</h2>
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block text-2xl text-[#3E2C41] mx-2"
              >
                biology
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-block text-2xl text-[#3E2C41] mx-2"
              >
                agency
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="inline-block text-2xl text-[#3E2C41] mx-2"
              >
                legacy
              </motion.span>
            </div>
            <p className="mt-8 text-lg text-[#2E2E2E] leading-relaxed">
              Looking ahead, I envision a future where technology serves as a bridge between human potential 
              and meaningful impact. My journey continues to evolve, driven by curiosity and a commitment to 
              creating lasting value.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
} 