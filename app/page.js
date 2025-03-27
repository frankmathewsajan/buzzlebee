'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { ArrowUpCircle, ArrowDownCircle, CheckCircle } from '@geist-ui/icons';
import { FaGithub, FaLinkedin, FaDiscord, FaInstagram } from 'react-icons/fa';

const CustomGauge = ({ value, size = "small", currentSection }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-10 h-10",
    large: "w-12 h-12"
  };

  const colors = {
    '0': '#ffffff',    // white
    '10': '#e0f2fe',   // sky-100
    '20': '#bae6fd',   // sky-200
    '30': '#7dd3fc',   // sky-300
    '40': '#38bdf8',   // sky-400
    '50': '#f0fdf4',   // green-50
    '60': '#dcfce7',   // green-100
    '70': '#bbf7d0',   // green-200
    '80': '#86efac',   // green-300
    '90': '#4ade80',   // green-400
    '100': '#fecaca'   // red-200
  };

  const getColor = (value) => {
    const thresholds = Object.keys(colors).map(Number).sort((a, b) => a - b);
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (value >= thresholds[i]) {
        return colors[thresholds[i]];
      }
    }
    return colors['0'];
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <svg className="w-full h-full" viewBox="0 0 24 24">
        {/* Background circle */}
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke={getColor(0)}
          strokeWidth="1.5"
          className="opacity-20"
        />
        {/* Progress circle */}
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke={getColor(value)}
          strokeWidth="1"
          strokeDasharray={`${(value / 100) * 62.83} 62.83`}
          transform="rotate(-90 12 12)"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-base font-medium text-white">
        {currentSection}
      </span>
    </div>
  );
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [showNavMenu, setShowNavMenu] = useState(false);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const achievementsRef = useRef(null);
  const contactRef = useRef(null);

  const sections = [
    { id: 'home', ref: homeRef, label: 'Home' },
    { id: 'about', ref: aboutRef, label: 'About' },
    { id: 'achievements', ref: achievementsRef, label: 'Achievements' },
    { id: 'contact', ref: contactRef, label: 'Contact' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add fade effect when section enters/leaves viewport
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          } else {
            entry.target.classList.add('opacity-0', 'translate-y-10');
            entry.target.classList.remove('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(section => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#e7dfd8]">
      <Navbar activeSection={activeSection} />

      {/* Hero Section */}
      <section 
        id="home" 
        ref={homeRef} 
        className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden opacity-0 translate-y-10 transition-all duration-700 ease-out"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="text-left space-y-8">
              <div className="space-y-5">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_forwards]">
                  Frank Mathew Sajan
                </h1>
                <div className="h-1 w-24 bg-gray-800 rounded-full opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.2s_forwards] my-6"></div>
                <div className="flex flex-wrap gap-3 mb-6 opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.3s_forwards]">
                  <span className="px-4 py-2 bg-white/80 text-gray-700 text-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300">Software Engineer</span>
                  <span className="px-4 py-2 bg-white/80 text-gray-700 text-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300">ML Engineer</span>
                  <span className="px-4 py-2 bg-white/80 text-gray-700 text-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300">Robotics</span>
                  <span className="px-4 py-2 bg-white/80 text-gray-700 text-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300">Research</span>
                </div>
                <p className="text-gray-600 max-w-lg text-lg opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.6s_forwards] leading-relaxed">
                  Crafting elegant solutions to complex problems through clean code and innovative thinking.
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-3 opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.8s_forwards] mt-32">
                <span className="text-base font-medium text-gray-700 animate-pulse">Scroll to explore</span>
                <div className="relative">
                  <div className="w-6 h-10 border-2 border-gray-500 rounded-full p-1 relative">
                    <div className="w-1.5 h-1.5 bg-gray-700 rounded-full mx-auto animate-[scrollBounce_2s_infinite]"></div>
                  </div>
                  {/* Add animated rings around the scroll indicator */}
                  <div className="absolute -inset-2 border-2 border-gray-400/20 rounded-full animate-[ping_2s_infinite]"></div>
                  <div className="absolute -inset-2 border-2 border-gray-400/20 rounded-full animate-[ping_2s_infinite_1s]"></div>
                </div>
                <style jsx>{`
                  @keyframes scrollBounce {
                    0%, 20%, 50%, 80%, 100% {
                      transform: translateY(0);
                    }
                    40% {
                      transform: translateY(5px);
                    }
                    60% {
                      transform: translateY(3px);
                    }
                  }
                `}</style>
              </div>
            </div>
            
            <div className="relative aspect-square w-full max-w-[400px] mx-auto opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.4s_forwards]">
              <div className="absolute inset-0 bg-gray-900 rounded-3xl transform rotate-3 opacity-20 shadow-xl"></div>
              <Image
                src="/images/mathew.webp"
                alt="Frank Mathew Sajan"
                fill
                className="object-cover rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-2 bg-white/10 backdrop-blur-sm"
                priority
                sizes="(max-width: 768px) 300px, 400px"
                style={{
                  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                  transition: 'transform 0.3s ease-out'
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 20;
                  const rotateY = (centerX - x) / 20;
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Menu Button */}
      <button
        onClick={() => setShowNavMenu(!showNavMenu)}
        className="fixed bottom-8 right-8 bg-gray-900/80 backdrop-blur-sm text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-gray-800/90 transition-all duration-300 flex items-center gap-1 w-[240px]"
      >
        <div className="flex-shrink-0 -ml-1">
          <CustomGauge 
            value={((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}
            size="small"
            currentSection={sections.findIndex(s => s.id === activeSection) + 1}
          />
        </div>
        <span className="text-base w-[140px] text-center transition-all duration-500 ease-in-out truncate">
          {sections.find(s => s.id === activeSection)?.label}
        </span>
        {showNavMenu ? (
          <ArrowDownCircle className="w-5 h-5 flex-shrink-0 transition-transform duration-500 ease-in-out" />
        ) : (
          <ArrowUpCircle className="w-5 h-5 flex-shrink-0 transition-transform duration-500 ease-in-out" />
        )}
      </button>

      {/* Navigation Menu Dropdown */}
      {showNavMenu && (
        <div className="fixed bottom-24 right-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden w-56 z-50 border border-gray-100">
          <div className="py-2">
            {/* Back to Top Button */}
            <button
              onClick={() => {
                setShowNavMenu(false);
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 300);
              }}
              className="w-full px-6 py-2 text-left hover:bg-gray-50/80 transition-all duration-300 flex items-center gap-3 group border-b border-gray-100"
            >
              <span className="text-xs text-gray-500 group-hover:text-gray-900 transition-colors duration-300">
                Back to Top
              </span>
            </button>

            {/* Section List */}
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => {
                  setShowNavMenu(false);
                  setTimeout(() => {
                    section.ref.current?.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
                className={`w-full px-6 py-3 text-left hover:bg-gray-50/80 transition-all duration-300 flex items-center justify-between group ${
                  activeSection === section.id ? 'bg-gray-50/80 font-medium' : ''
                }`}
              >
                <span className={`text-sm transition-colors duration-300 ${
                  activeSection === section.id ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
                }`}>
                  {index + 1}. {section.label}
                </span>
                {activeSection === section.id && (
                  <CheckCircle className="w-4 h-4 text-gray-900" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* About Section */}
      <section 
        id="about" 
        ref={aboutRef} 
        className="min-h-screen flex items-center justify-center bg-[#e7dfd8] opacity-0 translate-y-10 transition-all duration-700 ease-out"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#e7dfd8] dark:bg-gray-900 rounded-2xl p-8 shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  I am a passionate software developer with a keen interest in creating elegant solutions to complex problems. 
                  I specialize in web development and enjoy building user-friendly applications that make a difference.
                </p>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Education</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="font-medium text-gray-900 dark:text-white">Your University</p>
                    <p className="text-gray-600 dark:text-gray-300">Degree in Computer Science</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-gray-900 dark:text-white">Frontend</h4>
                    <p className="text-gray-600 dark:text-gray-300">React, Next.js, HTML, CSS</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-gray-900 dark:text-white">Backend</h4>
                    <p className="text-gray-600 dark:text-gray-300">Node.js, Python, SQL</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-gray-900 dark:text-white">Tools</h4>
                    <p className="text-gray-600 dark:text-gray-300">Git, Docker, AWS</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-gray-900 dark:text-white">Design</h4>
                    <p className="text-gray-600 dark:text-gray-300">Figma, Adobe XD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section 
        id="achievements" 
        ref={achievementsRef} 
        className="min-h-screen flex items-center justify-center bg-[#e7dfd8] opacity-0 translate-y-10 transition-all duration-700 ease-out"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center animate-fade-in">
            Achievements
          </h2>
          <div className="space-y-8">
            {[1, 2, 3].map((achievement, index) => (
              <div
                key={achievement}
                className="relative pl-8 border-l-2 border-gray-300 dark:border-gray-700 animate-slide-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full left-[-7px] top-2"></div>
                <div className="bg-[#e7dfd8] dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Achievement {achievement}</h3>
                  <p className="text-gray-600 dark:text-gray-300">Description of the achievement and its significance.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={contactRef} 
        className="min-h-screen flex items-center justify-center bg-[#e7dfd8] opacity-0 translate-y-10 transition-all duration-700 ease-out"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Don&apos;t be shy!</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Feel free to contact me. I am always open to discussing new projects, creative ideas, or opportunities to contribute to your visions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:frankmathewsajan@gmail.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                    frankmathewsajan@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400">Not there yet. 🥢 </span>
              </div>
              </div>
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect with Me</h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="https://github.com/frankmathewsajan" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <FaGithub className="w-5 h-5" />
                  GitHub
                </a>
                <a href="https://linkedin.com/in/frankmathewsajan" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <FaLinkedin className="w-5 h-5" />
                  LinkedIn
                </a>
                <a href="https://discord.com/users/frankmathewsajan" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <FaDiscord className="w-5 h-5" />
                  Discord
                </a>
                <a href="https://instagram.com/frankmathewsajan" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <FaInstagram className="w-5 h-5" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
