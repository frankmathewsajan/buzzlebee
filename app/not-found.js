'use client';

import { Space_Grotesk, Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Font setup
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function NotFound() {
  const availablePages = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Case Studies', href: '/case-studies' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF5EE] via-[#F8F2E9] to-[#FAF5EE] px-4">
      <motion.div 
        className="text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className={`${spaceGrotesk.className} text-8xl md:text-9xl text-[#5D503A]`}>
          404
        </h1>
        <div className="space-y-4">
          <h2 className={`${spaceGrotesk.className} text-2xl md:text-3xl text-[#5D503A]`}>
            Page Not Found
          </h2>
          <p className={`${inter.className} text-[#5D503A]/60 max-w-md mx-auto`}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className={`${spaceGrotesk.className} text-sm uppercase tracking-wider text-[#5D503A]`}>
            Available Pages
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {availablePages.map((page) => (
              <Link
                key={page.name}
                href={page.href}
                className={`${inter.className} px-4 py-2 rounded-full border border-[#5D503A]/20 hover:border-[#5D503A] text-[#5D503A] hover:text-[#5D503A]/80 transition-all duration-200`}
              >
                {page.name}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 