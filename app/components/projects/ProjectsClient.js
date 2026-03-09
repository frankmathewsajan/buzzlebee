'use client';

import { useMemo, useState } from 'react';
import ExternalLinkModal from '@/app/components/ExternalLinkModal';
import { useSectionNavigation } from '@/app/hooks/useSectionNavigation';

const DOMAIN_COLORS = {
  'IoT/Embedded Systems': { bg: '#FFF9E6', text: '#321b15', accent: '#8B4513' },
  'AI/ML': { bg: '#F5F5F5', text: '#2C3E50', accent: '#34495E' },
  'Full-stack Development': { bg: '#ece5d8', text: '#321b15', accent: '#5D503A' },
  'Financial Technology': { bg: '#E8F4F8', text: '#2B6CB0', accent: '#2C5282' },
  'Educational Software': { bg: '#F0FDF4', text: '#2F855A', accent: '#276749' },
  'CS50P Final Project': { bg: '#E8F4F8', text: '#2B6CB0', accent: '#2C5282' },
  'CS50W Final Project': { bg: '#F0FDF4', text: '#2F855A', accent: '#276749' },
};

function ProjectListItem({ project, colors, scrollToSection, sgClass, interClass, index }) {
  return (
    <button
      onClick={() => scrollToSection(project.id)}
      className="stagger-item visible group block text-left w-full"
      style={{ transitionDelay: `${0.3 + index * 0.12}s` }}
    >
      <div
        className="flex items-baseline justify-between border-b border-[#5D503A]/20 pb-2 group-hover:border-[#5D503A] transition-all duration-200"
        style={{ boxShadow: `0 2px 4px -2px ${colors?.text}10` }}
      >
        <div className="space-y-0.5">
          <span className={`${interClass} text-base text-[#5D503A] block`}>{project.title}</span>
          <span className={`${interClass} text-xs text-[#5D503A]/60`}>{project.category}</span>
        </div>
        <span className={`${interClass} text-xs text-[#5D503A]/60`}>{project.timeline}</span>
      </div>
    </button>
  );
}

function ActionButton({ onClick, label, colors, filled, disabled, interClass }) {
  const style = filled
    ? { backgroundColor: colors.text, color: colors.bg }
    : { border: `1px solid ${colors.text}`, color: colors.text };
  if (disabled) {
    return (
      <span className={`${interClass} px-6 py-2 rounded-full opacity-60`} style={style}>
        {label}
      </span>
    );
  }
  return (
    <button onClick={onClick} className={`${interClass} px-6 py-2 rounded-full transition-colors duration-200 cursor-pointer`} style={style}>
      {label}
    </button>
  );
}

export default function ProjectsClient({ projects, sgClass, interClass }) {
  const [showMiniModal, setShowMiniModal] = useState(false);
  const [extLink, setExtLink] = useState({ open: false, url: '', name: '' });

  const sectionIds = useMemo(() => ['overview', ...projects.map(p => p.id)], [projects]);
  const { activeSection, visibleSection, scrollProgress, sectionRefs, scrollToSection } = useSectionNavigation(sectionIds);

  const handleExtLink = (url, name) => setExtLink({ open: true, url, name });

  const miniProjects = useMemo(() => ({
    'CS50P': projects.find(p => p.id === 'library-management')?.relatedMiniProjects ?? [],
    'CS50W': projects.find(p => p.id === 'hss-manager')?.relatedMiniProjects ?? [],
    'Full Stack Open': [
      { name: 'Note App', tech: 'React, Node.js' },
      { name: 'Phonebook', tech: 'MERN Stack' },
      { name: 'Blog List', tech: 'MERN Stack' },
      { name: 'Countries', tech: 'React, REST APIs' },
    ],
  }), [projects]);

  const featured = projects.filter(p => !p.category.includes('CS50'));
  const course = projects.filter(p => p.category.includes('CS50'));

  const getColors = (id) =>
    id === 'overview' ? { text: '#5D503A' } : DOMAIN_COLORS[projects.find(p => p.id === id)?.category];

  const currentColors = getColors(visibleSection);

  return (
    <>
      <ExternalLinkModal
        isOpen={extLink.open}
        onClose={() => setExtLink(s => ({ ...s, open: false }))}
        targetUrl={extLink.url}
        siteName={extLink.name}
      />

      {/* Back to Top */}
      {activeSection !== 'overview' && (
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => scrollToSection('overview')}
            className="p-3 rounded-full border border-[#5D503A]/20 hover:border-[#5D503A] text-[#5D503A] hover:text-[#5D503A]/80 transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white/90"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Overview Section */}
      <section
        id="overview"
        ref={sectionRefs.overview}
        className="min-h-screen flex items-start relative px-8 bg-linear-to-br from-[#FAF5EE] via-[#F8F2E9] to-[#FAF5EE] pt-16"
      >
        <div className={`max-w-[90vw] mx-auto w-full section-fade ${visibleSection === 'overview' ? 'visible' : 'exit'}`}>
          <h1 className={`${sgClass} text-5xl md:text-7xl leading-none text-[#5D503A] mb-12 slide-left ${visibleSection === 'overview' ? 'visible' : ''}`}>
            Built to<br />Challenge
          </h1>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 section-fade ${visibleSection === 'overview' ? 'visible' : 'exit'}`} style={{ transitionDelay: '0.2s' }}>
            {/* Featured Projects */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className={`${sgClass} text-base md:text-lg text-[#5D503A] uppercase tracking-wider stagger-item ${visibleSection === 'overview' ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
                  Featured Projects
                </h3>
                <div className="space-y-4">
                  {featured.map((p, i) => (
                    <ProjectListItem key={p.id} project={p} colors={DOMAIN_COLORS[p.category]} scrollToSection={scrollToSection} sgClass={sgClass} interClass={interClass} index={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Course Projects + Scroll Indicator */}
            <div className="flex flex-col justify-between">
              <div className="space-y-4">
                <div className={`flex items-center justify-between stagger-item ${visibleSection === 'overview' ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
                  <h3 className={`${sgClass} text-base md:text-lg text-[#5D503A] uppercase tracking-wider`}>Course Projects</h3>
                  <button
                    onClick={() => setShowMiniModal(true)}
                    className={`${interClass} text-xs text-[#5D503A] hover:text-[#5D503A]/60 transition-colors duration-200 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#5D503A]/20 hover:border-[#5D503A]/40`}
                  >
                    View Mini Projects
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  {course.map((p, i) => (
                    <ProjectListItem key={p.id} project={p} colors={DOMAIN_COLORS[p.category]} scrollToSection={scrollToSection} sgClass={sgClass} interClass={interClass} index={i} />
                  ))}
                </div>
              </div>

              <div className={`flex items-center justify-center mt-24 section-fade ${visibleSection === 'overview' ? 'visible' : 'exit'}`} style={{ transitionDelay: '0.4s' }}>
                <button
                  className="animate-scroll-bounce relative w-24 h-24 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    const i = sectionIds.indexOf(visibleSection);
                    if (i < sectionIds.length - 1) scrollToSection(sectionIds[i + 1]);
                  }}
                >
                  <div className="absolute inset-0 border-2 border-[#5D503A]/40 rounded-full" />
                  <div className="flex flex-col items-center">
                    <span className={`${interClass} text-sm text-[#5D503A] mb-1`}>scroll</span>
                    <svg className="w-4 h-4 text-[#5D503A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Projects Modal */}
      {showMiniModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowMiniModal(false)}>
          <div
            className="animate-modal-enter bg-[#FAF5EE] rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#5D503A]/10">
              <h3 className={`${sgClass} text-2xl text-[#5D503A]`}>Course Mini Projects</h3>
              <button onClick={() => setShowMiniModal(false)} className="text-[#5D503A]/60 hover:text-[#5D503A] transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-8">
              {Object.entries(miniProjects).map(([course, items]) => (
                <div key={course} className="space-y-4">
                  <h4 className={`${sgClass} text-lg text-[#5D503A]`}>{course}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {items.map((p, i) => (
                      <div key={i} className="p-4 rounded-lg border border-[#5D503A]/10 hover:border-[#5D503A]/30 transition-colors duration-200">
                        <p className={`${interClass} text-base text-[#5D503A]`}>{p.name}</p>
                        <p className={`${interClass} text-sm text-[#5D503A]/60 mt-1`}>{p.tech}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Individual Project Sections */}
      {projects.map(project => {
        const colors = DOMAIN_COLORS[project.category];
        return (
          <section key={project.id} id={project.id} ref={sectionRefs[project.id]} className="min-h-screen flex items-center relative" style={{ backgroundColor: colors.bg }}>
            <div className={`max-w-[90vw] mx-auto w-full px-8 py-16 section-fade ${visibleSection === project.id ? 'visible' : 'exit'}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className={`space-y-12 slide-left ${visibleSection === project.id ? 'visible' : ''}`}>
                  <div>
                    <p className={`${interClass} text-sm mb-2`} style={{ color: colors.accent }}>{project.category}</p>
                    <h2 className={`${sgClass} text-6xl`} style={{ color: colors.text }}>{project.title}</h2>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className={`${sgClass} text-sm uppercase tracking-wider`} style={{ color: colors.accent }}>Overview</h3>
                      <p className={`${interClass} text-lg`} style={{ color: `${colors.text}CC` }}>{project.description}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className={`${sgClass} text-sm uppercase tracking-wider`} style={{ color: colors.accent }}>Achievement</h3>
                      <p className={`${interClass} italic`} style={{ color: colors.text }}>{project.achievements}</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    {project.has_demo && (
                      <ActionButton onClick={() => handleExtLink(project.links.demo, `${project.title} - Demo`)} label="View Demo" colors={colors} filled interClass={interClass} />
                    )}
                    {project.has_github && (
                      project.has_github === 'in_progress'
                        ? <ActionButton label="GitHub - In Progress" colors={colors} disabled interClass={interClass} />
                        : <ActionButton onClick={() => handleExtLink(project.links.github, `${project.title} - GitHub`)} label="GitHub" colors={colors} interClass={interClass} />
                    )}
                    {project.has_case_study && !project.case_study_hidden && (
                      <ActionButton onClick={() => handleExtLink(project.links.caseStudy, `${project.title} - Case Study`)} label="View Case Study" colors={colors} interClass={interClass} />
                    )}
                  </div>
                </div>

                <div className={`space-y-12 slide-right ${visibleSection === project.id ? 'visible' : ''}`}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className={`${sgClass} text-sm uppercase tracking-wider mb-2`} style={{ color: colors.accent }}>Role</h3>
                      <p className={`${interClass}`} style={{ color: `${colors.text}CC` }}>{project.role}</p>
                    </div>
                    <div>
                      <h3 className={`${sgClass} text-sm uppercase tracking-wider mb-2`} style={{ color: colors.accent }}>Timeline</h3>
                      <p className={`${interClass}`} style={{ color: `${colors.text}CC` }}>{project.timeline}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className={`${sgClass} text-sm uppercase tracking-wider mb-4`} style={{ color: colors.accent }}>Tech Stack</h3>
                    <div className="space-y-6">
                      {Object.entries(project.skills).map(([category, skills]) => (
                        <div key={category}>
                          <p className={`${interClass} text-sm mb-2`} style={{ color: `${colors.text}99` }}>{category}</p>
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                              <span key={i} className={`${interClass} px-3 py-1 rounded-full text-sm`} style={{ backgroundColor: `${colors.text}22`, color: colors.text }}>
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Navigation Dots */}
      {!showMiniModal && (
        <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-100 flex flex-col items-end">
          <div className={`flex flex-col items-end ${activeSection === 'overview' ? 'gap-6' : 'gap-3'}`}>
            {sectionIds.map(id => {
              const colors = getColors(id);
              const project = projects.find(p => p.id === id);
              return (
                <button key={id} onClick={() => scrollToSection(id)} className={`group flex items-center gap-3 ${activeSection === 'overview' ? 'cursor-default' : ''}`}>
                  <span className={`${interClass} text-sm transition-all duration-300 ${activeSection === 'overview' ? 'hidden' : 'opacity-0 group-hover:opacity-100'}`} style={{ color: colors.text }}>
                    {id === 'overview' ? 'Overview' : project?.title}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150"
                    style={{
                      backgroundColor: visibleSection === id ? colors.text : `${colors.text}4D`,
                      transform: visibleSection === id ? 'scale(1.5)' : 'scale(1)',
                    }}
                  />
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Scroll Progress Bar */}
      <div className="fixed left-0 top-0 h-1 w-full z-50" style={{ backgroundColor: `${currentColors?.text}20` }}>
        <div className="h-full transition-transform duration-100" style={{ backgroundColor: currentColors?.text, transform: `scaleX(${scrollProgress / 100})`, transformOrigin: '0%' }} />
      </div>
    </>
  );
}
