'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronRight } from '@geist-ui/icons';

export default function Navbar({ activeSection = 'home' }) {
  const [showName, setShowName] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show name when scrolled past hero section (about 80vh)
      setShowName(scrollPosition > window.innerHeight * 0.8);
    };

    // Only add scroll listener on home page
    if (pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [pathname]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = () => {
    if (pathname === '/') {
      scrollToSection('home');
    } else {
      window.location.href = '/';
    }
  };

  // Always show name on projects and blog pages
  const shouldShowName = pathname !== '/' || showName;

  // Format section name for display
  const getSectionName = () => {
    if (pathname !== '/') return 'Frank Mathew Sajan';
    if (!shouldShowName) return '';
    if (activeSection === 'contact') return 'Get in Touch';
    return activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#e7dfd8]/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="w-32">
            <div className={`text-xl font-bold text-gray-900 transition-opacity duration-300 whitespace-nowrap ${shouldShowName ? 'opacity-100' : 'opacity-0'}`}>
              {getSectionName()}
            </div>
          </div>
          <div className="w-24"></div>
          <div className="w-24">
            <Link 
              href="/projects" 
              className="text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-1 group"
            >
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 group-hover:text-gray-900 transition-colors">Next</span>
                <span className="flex items-center gap-1">
                  <span className="font-bold">Project</span>
                  <ChevronRight className="w-4 h-4 group-hover:text-gray-900 transition-colors" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 