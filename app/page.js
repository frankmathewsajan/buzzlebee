'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, memo } from "react";
import { ArrowUpCircle, ArrowDownCircle, CheckCircle } from '@geist-ui/icons';
import { FaGithub, FaLinkedin, FaDiscord, FaInstagram } from 'react-icons/fa';

const CustomGauge = memo(({ value, size = "small", currentSection }) => {
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
});

const NavigationMenu = memo(({ showNavMenu, setShowNavMenu, sections, activeSection }) => {
  const [activeSubsection, setActiveSubsection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (!aboutSection) return;

      const subsections = ['about-me', 'journey', 'education', 'experience', 'beyond-code'];
      const subsectionElements = subsections.map(id => document.getElementById(id));
      
      const visibleSubsection = subsectionElements.find(element => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });

      if (visibleSubsection) {
        setActiveSubsection(visibleSubsection.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    showNavMenu && (
      <div className="fixed bottom-24 right-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden w-64 z-50 border border-gray-100">
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
            <div key={section.id}>
              <button
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

              {/* Subsections for About section */}
              {section.id === 'about' && activeSection === 'about' && section.subsections && (
                <div className="pl-6 bg-gray-50/50">
                  {section.subsections.map((subsection) => (
                    <button
                      key={subsection.id}
                      onClick={() => {
                        setShowNavMenu(false);
                        const element = document.getElementById(subsection.id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      className={`w-full px-6 py-2 text-left text-sm transition-all duration-300 ${
                        activeSubsection === subsection.id
                          ? 'text-gray-900 font-medium bg-gray-100/50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
                      }`}
                    >
                      {subsection.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  );
});

NavigationMenu.displayName = 'NavigationMenu';
CustomGauge.displayName = 'CustomGauge';

const ProjectCard = memo(({ title, description, tags }) => {
  return (
    <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all duration-300">
      <h4 className="text-xl font-medium text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-white/50 rounded-full text-sm text-gray-600">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [showNavMenu, setShowNavMenu] = useState(false);
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    journey: useRef(null),
    projects: useRef(null),
    achievements: useRef(null),
    contact: useRef(null)
  };

  const sections = [
    { id: 'home', ref: sectionRefs.home, label: 'Being Frank' },
    { 
      id: 'about', 
      ref: sectionRefs.about, 
      label: 'The Story',
      subsections: [
        { id: 'about-me', label: 'About Me' },
        { id: 'journey', label: 'The Journey' },
        { id: 'education', label: 'Education' },
        { id: 'experience', label: 'Experience' },
        { id: 'achievements', label: 'Notable Achievements' },
        { id: 'beyond-code', label: 'Beyond Code' }
      ]
    },
    { id: 'projects', ref: sectionRefs.projects, label: 'The Work' },
    { id: 'contact', ref: sectionRefs.contact, label: 'Talk to Frank' }
  ];

  useEffect(() => {
    let observer;
    const observerOptions = { 
      threshold: [0.2, 0.5, 0.8],
      rootMargin: '-10% 0px'
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.2) {
          setActiveSection(entry.target.id);
          requestAnimationFrame(() => {
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            entry.target.classList.add('opacity-100', 'translate-y-0');
          });
        } else {
          requestAnimationFrame(() => {
            entry.target.classList.add('opacity-0', 'translate-y-10');
            entry.target.classList.remove('opacity-100', 'translate-y-0');
          });
        }
      });
    };

    try {
      observer = new IntersectionObserver(handleIntersection, observerOptions);
      sections.forEach(section => {
        if (section.ref.current) {
          observer.observe(section.ref.current);
        }
      });
    } catch (error) {
      console.error('Intersection Observer error:', error);
    }

    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (sectionRefs.home.current) {
      sectionRefs.home.current.classList.remove('opacity-0', 'translate-y-10');
      sectionRefs.home.current.classList.add('opacity-100', 'translate-y-0');
    }
  }, []);

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          scrollTimeout = null;
        }, 66);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#e7dfd8]">
      {/* Hero Section */}
      <section 
        id="home" 
        ref={sectionRefs.home} 
        className="min-h-screen flex items-center justify-center relative overflow-hidden opacity-0 translate-y-10 transition-all duration-1000 ease-in-out"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-left space-y-12 ml-8">
              <div className="relative">
                <h1 className="text-[5rem] md:text-[8rem] text-gray-800 opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_forwards] font-caveat leading-[1.1] hover:scale-105 transition-transform cursor-default">
                  Just
                </h1>
                <div className="text-[6rem] md:text-[9rem] font-caveat text-gray-800 opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.2s_forwards] hover:scale-105 transition-transform cursor-default leading-[1.1]">
                  Frank
                </div>
                <p className="text-lg md:text-xl text-gray-600 mt-12 font-serif italic max-w-xl opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.4s_forwards] leading-relaxed tracking-wide">
                  Shaping ideas that transcend time<br/>
                  <span className="ml-4 inline-block">—one bug at a time.</span>
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-6 mt-16 max-w-xl opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.6s_forwards]">
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl">
                    <div className="text-3xl font-caveat text-gray-800 mb-1">5+</div>
                    <div className="text-sm font-outfit text-gray-600">Years of Coding</div>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl">
                    <div className="text-3xl font-caveat text-gray-800 mb-1">10+</div>
                    <div className="text-sm font-outfit text-gray-600">AI/ML & Software Projects</div>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl">
                    <div className="text-3xl font-caveat text-gray-800 mb-1">3+</div>
                    <div className="text-sm font-outfit text-gray-600">Hackathons & Competitions</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Image - slightly smaller */}
            <div className="relative aspect-square w-full max-w-[450px] mx-auto opacity-0 translate-x-4 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
              <div className="absolute inset-0 bg-gray-900 rounded-3xl transform rotate-3 opacity-20 shadow-xl"></div>
              <Image
                src="/images/mathew.webp"
                alt="Frank Mathew Sajan"
                fill
                className="object-cover rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-2 bg-white/10 backdrop-blur-sm"
                priority
                sizes="(max-width: 768px) 100vw, 450px"
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

      {/* Fixed Navigation */}
      <div className="fixed z-50 bottom-8 right-8">
        <button
          onClick={() => setShowNavMenu(prev => !prev)}
          className="bg-gray-900/80 backdrop-blur-sm text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-gray-800/90 transition-all duration-300 flex items-center gap-1 w-[240px] pointer-events-auto"
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
      </div>

      {/* Navigation Menu */}
      <NavigationMenu 
        showNavMenu={showNavMenu}
        setShowNavMenu={setShowNavMenu}
        sections={sections}
        activeSection={activeSection}
      />

      {/* About Section */}
      <section 
        id="about" 
        ref={sectionRefs.about} 
        className="min-h-screen flex items-center justify-center bg-[#e7dfd8] opacity-0 translate-y-10 transition-all duration-1000 ease-in-out"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* About Me + Journey + Beyond Code */}
          <div id="about-me" className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
            {/* Left Column - Image */}
            <div className="relative aspect-square w-full max-w-[400px] mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gray-900 rounded-3xl transform rotate-3 opacity-20 shadow-xl"></div>
              <Image
                src="/images/frank.jpg"
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

            {/* Middle Column - About Me */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Me</h2>
              <p className="text-xl font-medium text-gray-800 mb-8 italic">
                &ldquo;I break things, fix them, and sometimes make them better.&rdquo;
              </p>
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  I&apos;m Frank, a Computer Science student obsessed with AI, ML, and building things that actually matter. 
                  From crafting intelligent systems to making sleek interfaces, I thrive at the intersection of logic and creativity.
                </p>
              </div>
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="space-y-16">
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              <div className="space-y-12">
                {/* Journey */}
                <div id="journey" className="relative pl-8">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gray-900 rounded-full"></div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Journey</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Started with a simple &quot;Hello, World!&quot; and now crafting AI solutions. 
                    The path from basic programming to machine learning has been an adventure of constant learning and growth.
                  </p>
                </div>

                {/* Education */}
                <div id="education" className="relative pl-8">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gray-900 rounded-full"></div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Education</h3>
                  <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                    <h4 className="text-xl font-medium text-gray-900">BTech in Computer Science</h4>
                    <p className="text-gray-600">AI/ML Specialization</p>
                    <p className="text-gray-500 text-sm mt-2">2020 - Present</p>
                  </div>
                </div>

                {/* Experience */}
                <div id="experience" className="relative pl-8">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gray-900 rounded-full"></div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Experience</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                      <h4 className="text-xl font-medium text-gray-900">5+ Years of Coding</h4>
                      <p className="text-gray-600">Full-stack Development & AI/ML</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                      <h4 className="text-xl font-medium text-gray-900">3+ Years AI/ML</h4>
                      <p className="text-gray-600">Deep Learning & Computer Vision</p>
                    </div>
                  </div>
                </div>

                {/* Notable Achievements */}
                <div id="achievements" className="relative pl-8">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gray-900 rounded-full"></div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Notable Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((achievement, index) => (
                      <div
                        key={achievement}
                        className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all duration-300"
                      >
                        <div className="text-4xl font-caveat text-gray-800 mb-4">0{achievement}</div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-3">Achievement Title</h4>
                        <p className="text-gray-600">Description of the achievement and its significance.</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Beyond Code */}
                <div id="beyond-code" className="relative pl-8">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gray-900 rounded-full"></div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Beyond Code</h3>
                  <p className="text-gray-700 text-lg leading-relaxed italic mb-6">
                    &ldquo;When I&apos;m not coding, I&apos;m probably dissecting AI papers, binging internet memes, 
                    or arguing whether dark mode is superior (it is).&rdquo;
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Current Focus</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Deep Learning Research</li>
                        <li>Full-stack Development</li>
                        <li>Open Source Contributions</li>
                        <li>Hackathon Projects</li>
                      </ul>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Interests</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>AI Ethics & Future Tech</li>
                        <li>UI/UX Design</li>
                        <li>Tech Community Building</li>
                        <li>Continuous Learning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Focus on Tech Stack and Projects */}
      <section 
        id="projects" 
        ref={sectionRefs.projects} 
        className="min-h-screen flex items-center justify-center bg-[#e7dfd8] opacity-0 translate-y-10 transition-all duration-1000 ease-in-out"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* Tech Arsenal */}
            <div className="space-y-12">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-bold text-gray-900">Tech Arsenal</h2>
                <button 
                  onClick={() => window.open('/projects', '_blank')}
                  className="group relative px-6 py-3 text-lg font-medium text-white bg-gray-900/90 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:shadow-lg"
                >
                  <span className="relative z-10">See My Projects</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all duration-300">
                  <h4 className="text-xl font-medium text-gray-900 mb-4">AI/ML</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>Neural Networks</li>
                    <li>Computer Vision</li>
                    <li>Natural Language Processing</li>
                    <li>Machine Learning Models</li>
                  </ul>
                </div>

                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all duration-300">
                  <h4 className="text-xl font-medium text-gray-900 mb-4">Web Dev</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>React & Next.js</li>
                    <li>TailwindCSS</li>
                    <li>Node.js & Express</li>
                    <li>REST APIs & GraphQL</li>
                  </ul>
                </div>

                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all duration-300">
                  <h4 className="text-xl font-medium text-gray-900 mb-4">Tools</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>Git & GitHub</li>
                    <li>Docker & Kubernetes</li>
                    <li>AWS Cloud Services</li>
                    <li>Linux (Kali on WSL)</li>
                  </ul>
                </div>

                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all duration-300">
                  <h4 className="text-xl font-medium text-gray-900 mb-4">Core</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>Python & JavaScript</li>
                    <li>C++ & Java</li>
                    <li>System Design</li>
                    <li>Problem Solving</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Featured Projects */}
            <div className="space-y-8">
              <h3 className="text-3xl font-semibold text-gray-900">Featured Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProjectCard 
                  title="AI Healthcare Solution"
                  description="Developed an AI-powered diagnostic tool for early disease detection using computer vision."
                  tags={["Python", "TensorFlow", "OpenCV"]}
                />

                <ProjectCard 
                  title="Smart Portfolio"
                  description="A modern, responsive portfolio website built with Next.js and TailwindCSS."
                  tags={["Next.js", "TailwindCSS", "React"]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={sectionRefs.contact} 
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
