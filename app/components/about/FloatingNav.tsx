"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FloatingNav() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 animate-nav-entry">
        <Link href="/">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-gray-200/50 text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Home</span>
          </button>
        </Link>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-gray-200/50 text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95 ${
          showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-80 pointer-events-none'
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </>
  );
}
