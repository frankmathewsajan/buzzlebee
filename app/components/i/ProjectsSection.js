'use client';

import Link from "next/link";
import { memo, useState } from "react";
import Tooltip from "../Tooltip";
import ExternalLinkModal from "../ExternalLinkModal";

const ProjectDisplayCard = memo(({ project, router, spaceGrotesk }) => {
  const [showExternalLinkModal, setShowExternalLinkModal] = useState(false);
  const [externalLinkUrl, setExternalLinkUrl] = useState('');
  const [externalLinkName, setExternalLinkName] = useState('');

  const handleExternalLink = (url, name) => {
    setExternalLinkUrl(url);
    setExternalLinkName(name);
    setShowExternalLinkModal(true);
  };

  return (
    <>
      <ExternalLinkModal
        isOpen={showExternalLinkModal}
        onClose={() => setShowExternalLinkModal(false)}
        targetUrl={externalLinkUrl}
        siteName={externalLinkName}
      />
      <div className="group cursor-pointer" onClick={() => router.push(`/projects#${project.id}`)}>
      <div className="w-full h-px bg-gray-300 mb-6"></div>
      
      <div className="space-y-5 mb-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-sm lg:text-base font-mono text-gray-900 ${project.id === 'monopoly-banking' ? 'mb-2 ' : ''}group-hover:text-red-600 transition-colors uppercase tracking-wider leading-tight ${spaceGrotesk.className}`}>
              {project.id === 'monopoly-banking' ? 'MONOPOLY DIGITAL BANKING SIMULATION' : project.title.replace(/System/g, 'SYSTEM').replace(/Platform/g, 'PLATFORM').toUpperCase()}
            </h3>
            <div className="flex items-center gap-2">
              {project.badges?.CLIENT && (
                <div 
                  className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-mono"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                  CLIENT
                </div>
              )}
              {project.badges?.DOCUMENTED && (
                <div className="relative group/badge">
                  <span 
                    className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-mono cursor-pointer hover:bg-indigo-200 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExternalLink(project.badges.DOCUMENTED, 'Case Study Documentation');
                    }}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    DOCUMENTED
                  </span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 text-white text-xs rounded-lg opacity-0 group-hover/badge:opacity-100 transition-all duration-200 whitespace-nowrap z-10 pointer-events-none">
                    Read case study →
                  </div>
                </div>
              )}
              {project.badges?.AWARDED && (
                <div 
                  className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-mono"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  AWARDED
                </div>
              )}
              {project.badges?.CERTIFIED && (
                <div className="relative group/badge">
                  <span 
                    className="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs font-mono cursor-pointer hover:bg-teal-200 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = project.badges.CERTIFIED;
                    }}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    CERTIFIED
                  </span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 text-white text-xs rounded-lg opacity-0 group-hover/badge:opacity-100 transition-all duration-200 whitespace-nowrap z-10 pointer-events-none">
                    View certifications →
                  </div>
                </div>
              )}
              {project.badges?.DEPLOYED && (
                <div className="relative group/badge">
                  <span 
                    className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-mono cursor-pointer hover:bg-green-200 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExternalLink(project.badges.DEPLOYED, `${project.title} - Live Site`);
                    }}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    DEPLOYED
                  </span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 text-white text-xs rounded-lg opacity-0 group-hover/badge:opacity-100 transition-all duration-200 whitespace-nowrap z-10 pointer-events-none">
                    Visit live {project.id === 'monopoly-banking' ? 'app' : 'site'} →
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">{tag}</span>
            ))}
          </div>
        </div>
        
        <div>
          <p className="text-gray-600 text-sm leading-relaxed font-mono">
            {project.id === 'monopoly-banking' 
              ? "Gamified banking system inspired by Monopoly's Ultimate Banking, featuring real-time balance updates and comprehensive transaction management."
              : project.id === 'library-management'
              ? "Comprehensive GUI-based system handling library operations with inventory management, member tracking, and automated fine calculations."
              : project.description}
          </p>
          <span className="text-xs text-gray-400 font-mono mt-2 block">{project.timeline.split(' - ')[0] || project.timeline}</span>
        </div>
      </div>
      
      <div className="mt-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/projects#${project.id}`);
          }}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-mono group/button"
        >
          <svg 
            className="w-4 h-4 transition-transform group-hover/button:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          Read more
        </button>
      </div>
    </div>
    </>
  );
});

ProjectDisplayCard.displayName = 'ProjectDisplayCard';

const ProjectsSection = memo(({ sectionRef, isVisible, projectsOpacity, indexProjects, router, spaceGrotesk }) => {
  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center bg-[#e7dfd8] transition-all duration-1000 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
      }`}
    >
      <div 
        className="w-full px-4 sm:px-6 lg:px-8 py-16 transition-opacity duration-700 ease-in-out"
        style={{ opacity: projectsOpacity }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-base text-gray-600 font-light max-w-xl mx-auto">
              Hand-picked projects across various domains.
            </p>
          </div>

          <div className="space-y-16 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {indexProjects.slice(0, 2).map((project) => (
                <ProjectDisplayCard key={project.id} project={project} router={router} spaceGrotesk={spaceGrotesk} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {indexProjects.slice(2, 4).map((project) => (
                <ProjectDisplayCard key={project.id} project={project} router={router} spaceGrotesk={spaceGrotesk} />
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 hover:shadow-lg font-medium tracking-wide uppercase text-sm"
            >
              View All Projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;
