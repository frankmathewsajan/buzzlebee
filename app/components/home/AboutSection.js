'use client';

import Image from "next/image";
import Link from "next/link";
import Tooltip from '../Tooltip';
import { memo } from "react";
import aboutSectionContent from '@/data/content/home/about-section-content.json';

const AboutSection = memo(({ sectionRef, isVisible }) => {
  return (
    <section
      id="about"
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center bg-[#e7dfd8] transition-all duration-1000 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-screen flex items-center">
        <div className="w-full">
          {/* Header */}
          <div className="mb-16">
            <div className="relative">
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-gray-900 font-sans uppercase tracking-wide">{aboutSectionContent.heading[0]}</span>
                  <span className="text-4xl font-semibold text-red-600 font-sans uppercase tracking-wide">{aboutSectionContent.heading[1]}</span>
                </div>
              </div>
              <div className="mt-4 w-12 h-px bg-red-600"></div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Chess Illustration */}
            <div className="lg:col-span-2 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-75">
                <div className="relative aspect-square">
                  <Image
                    src="/images/chess.png"
                    alt="Chess pieces illustration"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 300px, 300px"
                  />
                </div>
                <div className="mt-6 text-center space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-sans font-medium">
                    {aboutSectionContent.visual.title}
                  </p>
                  <div className="w-16 h-px bg-red-500 mx-auto opacity-60"></div>
                  <p className="text-sm text-gray-600 font-serif italic leading-relaxed whitespace-nowrap">
                    {aboutSectionContent.visual.caption}
                  </p>
                </div>
              </div>
            </div>

            {/* Article Text */}
            <div className="lg:col-span-3 space-y-8 lg:-mt-20">
              <div className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                {aboutSectionContent.intro}
              </div>
              
              <div className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                Just&nbsp;
                <Tooltip content="Check out my projects →">
                  <Link href="/projects" className="text-red-600 font-bold underline decoration-red-300 text-lg hover:bg-red-50 px-1 rounded transition-colors cursor-pointer">
                    poke around
                  </Link>
                </Tooltip>, check out the projects, see what I&apos;ve built. If something catches your eye,
                <span className="font-sans font-semibold text-gray-900 uppercase text-sm tracking-wide"> GREAT</span>. If not, no worries, you still got to see some
                <span className="text-red-500 font-serif italic"> decent</span> designs.
              </div>
              
              <div className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                {aboutSectionContent.reality}
              </div>

              <div className="text-gray-700 leading-relaxed text-lg font-serif text-justify">
                If you&apos;d like to read my&nbsp;
                <span className="text-red-600 font-serif italic text-lg">backstory</span>, <span className="text-red-600 font-serif italic text-lg">education</span>, and <span className="text-red-600 font-serif italic text-lg">experience</span>, head over to the&nbsp;
                <Tooltip content="Read my story →">
                  <Link href="/about" className="font-sans text-gray-900 uppercase text-base tracking-wider hover:text-red-600 transition-colors cursor-pointer border-b border-gray-400 hover:border-red-400">
                    ABOUT
                  </Link>
                </Tooltip> page. It&apos;s written as a&nbsp;
                <span className="text-red-500 font-serif italic">story</span> to keep things engaging.
              </div>

              {/* Signature */}
              <div className="mt-12 pt-8 border-t border-gray-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-red-500"></div>
                  <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-sans">{aboutSectionContent.signature}</span>
                  <div className="w-12 h-px bg-red-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
