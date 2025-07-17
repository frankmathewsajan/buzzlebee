'use client';

import { Space_Grotesk, Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PortfolioMap from '../components/PortfolioMap';

// Font setup
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function Blogs() {
  return (
    <div className="min-h-screen bg-[#ece7f0]">
      {/* Portfolio Explorer Map */}
      <PortfolioMap />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1 
          className={`${spaceGrotesk.className} text-5xl md:text-7xl leading-none text-[#2e2e2e] mb-12`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          My<br />Thoughts
        </motion.h1>
        
        <motion.p 
          className={`${inter.className} text-lg text-[#2e2e2e]/80 max-w-2xl mb-16`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          Sharing insights, experiences, and knowledge from my journey in technology and development.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog posts will be added here */}
          <motion.div 
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            <h3 className={`${spaceGrotesk.className} text-xl text-[#2e2e2e] mb-4`}>Coming Soon</h3>
            <p className={`${inter.className} text-[#2e2e2e]/80`}>
              Exciting content is on its way. Stay tuned for insightful articles about technology, development, and more.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 