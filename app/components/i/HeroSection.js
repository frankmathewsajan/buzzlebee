'use client';

import Image from "next/image";
import { memo } from "react";

const HeroSection = memo(({ sectionRef, isVisible }) => {
  return (
    <section
      id="home"
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-1000 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-left space-y-12 ml-8">
            <div className="relative">
              <h1 className="text-[4rem] md:text-[6rem] text-gray-800 font-caveat leading-[1.1] hover:scale-105 transition-transform cursor-default">
                Just
              </h1>
              <div className="text-[5rem] md:text-[7rem] font-caveat text-gray-800 hover:scale-105 transition-transform cursor-default leading-[1.1]">
                Frank
              </div>
              <p className="text-lg md:text-xl text-gray-600 mt-12 font-serif italic max-w-xl opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.4s_forwards] leading-relaxed tracking-wide">
                Shaping ideas that transcend time<br />
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
                  <div className="text-3xl font-caveat text-gray-800 mb-1">20+</div>
                  <div className="text-sm font-outfit text-gray-600">Hackathons & Competitions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
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
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
