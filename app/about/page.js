'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useMemo } from "react";

export default function About() {
  const [activeSection, setActiveSection] = useState('journey');
  const [subsectionProgress, setSubsectionProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const journeyRef = useRef(null);
  const achievementsRef = useRef(null);

  const sectionRefs = useMemo(() => ({
    journey: journeyRef,
    achievements: achievementsRef
  }), []);

  useEffect(() => {
    let observer;
    const observerOptions = {
      threshold: [0.1, 0.3, 0.5],
      rootMargin: '-10% 0px'
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.1) {
          setActiveSection(entry.target.id);
          requestAnimationFrame(() => {
            entry.target.classList.remove('opacity-0', 'translate-y-4', 'scale-98');
            entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
          });
        } else {
          requestAnimationFrame(() => {
            entry.target.classList.add('opacity-0', 'translate-y-4', 'scale-98');
            entry.target.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
          });
        }
      });
    };

    try {
      observer = new IntersectionObserver(handleIntersection, observerOptions);
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.observe(ref.current);
        }
      });
    } catch (error) {
      console.error('Intersection Observer error:', error);
    }

    return () => observer?.disconnect();
  }, [sectionRefs]);

  return (
    <div className="min-h-screen bg-[#e7dfd8] overflow-hidden">
      {/* Journey Section */}
      <section
        id="journey"
        ref={sectionRefs.journey}
        className="w-full flex items-center justify-center bg-[#e7dfd8] opacity-0 translate-y-4 scale-98 transition-all duration-700 ease-in-out py-8"
      >
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6 transform transition-all duration-500 hover:scale-102">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-xl font-bold text-white">1</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-gray-900">
                My Journey
              </h2>
            </div>
            
            {/* Early Years */}
            <div 
              className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl transform transition-all duration-500 hover:scale-[1.01] border border-white/30 shadow-md"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 hover:rotate-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">The Beginning</h3>
                  <p className="text-gray-700 text-base leading-relaxed font-light">
                    My journey in technology began with a simple "Hello, World!" program. 
                    What started as curiosity quickly turned into a passion for creating 
                    solutions that make a real difference in people's lives.
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl transform transition-all duration-500 hover:scale-[1.01] border border-white/30 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 hover:rotate-6">
                  <span className="text-2xl">🎓</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Education</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start transform transition-all duration-300 hover:translate-x-2">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">B.Tech in Computer Science & Engineering</h4>
                        <p className="text-gray-600 text-sm">Vellore Institute of Technology (VIT-AP)</p>
                        <p className="text-gray-600 text-sm mt-1">CGPA: 8.95/10.00</p>
                        <p className="text-gray-700 text-base leading-relaxed font-light mt-2">
                          Here, I discovered my passion for AI and machine learning, 
                          working on projects that combine technology with real-world 
                          applications.
                        </p>
                      </div>
                      <span className="text-gray-600 text-sm">2023 - Present</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl transform transition-all duration-500 hover:scale-[1.01] border border-white/30 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 hover:rotate-6">
                  <span className="text-2xl">💼</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Growth</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start transform transition-all duration-300 hover:translate-x-2">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">Purple Techno Solutions</h4>
                        <p className="text-gray-600 text-sm">Full Stack & ML Intern</p>
                        <p className="text-gray-700 text-base leading-relaxed font-light mt-2">
                          Working on cutting-edge AI applications, I've learned how to 
                          bridge the gap between theoretical knowledge and practical 
                          implementation.
                        </p>
                      </div>
                      <span className="text-gray-600 text-sm">Aug 2023 – Present</span>
                    </div>
                    <div className="flex justify-between items-start transform transition-all duration-300 hover:translate-x-2">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">TechToGreen Drone & Robotics</h4>
                        <p className="text-gray-600 text-sm">Research and Development Intern</p>
                        <p className="text-gray-700 text-base leading-relaxed font-light mt-2">
                          Developing safety systems for drones taught me the importance 
                          of reliability and precision in technology.
                        </p>
                      </div>
                      <span className="text-gray-600 text-sm">Aug 2023 – Present</span>
                    </div>
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
        ref={sectionRefs.achievements}
        className="w-full flex items-center justify-center bg-[#e7dfd8] opacity-0 translate-y-4 scale-98 transition-all duration-700 ease-in-out py-8"
      >
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6 transform transition-all duration-500 hover:scale-102">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-gray-900">
                Milestones & Recognition
              </h2>
            </div>
            
            {/* NASA Space Apps */}
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl transform transition-all duration-500 hover:scale-[1.01] border border-white/30 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 hover:rotate-6">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">NASA Space Apps 2024</h3>
                  <p className="text-gray-600 text-sm">Global Nominee</p>
                  <p className="text-gray-700 text-base leading-relaxed font-light mt-2">
                    Our team developed an innovative solution for space exploration, 
                    combining AI with environmental monitoring. This experience 
                    showed me the power of technology in solving global challenges.
                  </p>
                </div>
              </div>
            </div>

            {/* Rajya Puraskar */}
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl transform transition-all duration-500 hover:scale-[1.01] border border-white/30 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 hover:rotate-6">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Rajya Puraskar Award</h3>
                  <p className="text-gray-600 text-sm">Bharat Scouts & Guides Honor</p>
                  <p className="text-gray-700 text-base leading-relaxed font-light mt-2">
                    This recognition for leadership and community service taught me 
                    the importance of giving back and working together for common goals.
                  </p>
                </div>
              </div>
            </div>

            {/* Future Goals */}
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl transform transition-all duration-500 hover:scale-[1.01] border border-white/30 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 hover:rotate-6">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Looking Ahead</h3>
                  <p className="text-gray-700 text-base leading-relaxed font-light">
                    I'm excited to continue exploring the intersection of AI and human 
                    potential. My goal is to develop technologies that not only solve 
                    problems but also enhance our understanding of the world around us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}