'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useSectionNavigation } from '@/app/hooks/useSectionNavigation';

function MetaField({ label, children, interClass }) {
  return (
    <div>
      <h3 className={`${interClass} text-xs font-medium text-[#374151] uppercase tracking-wide mb-2`}>{label}</h3>
      {children}
    </div>
  );
}

export default function CertificationsClient({ certifications, spaceGroteskClass, interClass }) {
  const visibleCertifications = useMemo(() => certifications.filter(c => !c.hidden), [certifications]);
  const sectionIds = useMemo(() => ['overview', ...visibleCertifications.map(c => c.id)], [visibleCertifications]);

  const { activeSection: activeCert, visibleSection, scrollProgress, sectionRefs: certRefs, scrollToSection } =
    useSectionNavigation(sectionIds);

  return (
    <>
      {activeCert !== 'overview' && (
        <div className="fixed bottom-8 right-8 z-50">
          <button onClick={() => scrollToSection('overview')} className="p-3 rounded-full border border-[#E5E7EB] hover:border-[#2563EB] text-[#6B7280] hover:text-[#2563EB] transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Overview */}
      <section id="overview" ref={certRefs.overview} className="min-h-screen flex items-start relative px-8 bg-linear-to-br from-[#FAF5EE] via-[#F8F2E9] to-[#FAF5EE] pt-20">
        <div className={`max-w-6xl mx-auto w-full section-fade ${visibleSection === 'overview' ? 'visible' : 'exit'}`}>
          <div className={`mb-16 section-fade ${visibleSection === 'overview' ? 'visible' : 'exit'}`} style={{ transitionDelay: '0.1s' }}>
            <h1 className={`${spaceGroteskClass} text-5xl md:text-6xl font-medium leading-tight text-[#1A1A1A] mb-4`}>Certifications</h1>
            <p className={`${interClass} text-lg text-[#6B7280] max-w-2xl`}>Verified credentials and achievements demonstrating expertise across multiple domains.</p>
          </div>

          <div className={`space-y-8 section-fade ${visibleSection === 'overview' ? 'visible' : 'exit'}`} style={{ transitionDelay: '0.2s' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visibleCertifications.map((cert, i) => (
                <button key={cert.id} onClick={() => scrollToSection(cert.id)} className={`stagger-item ${visibleSection === 'overview' ? 'visible' : ''} group flex items-center gap-6 p-6 rounded-lg border border-[#E5E7EB] hover:border-[#2563EB] transition-all duration-300 bg-white hover:bg-[#F8FAFC] text-left w-full`} style={{ transitionDelay: `${0.3 + i * 0.1}s` }}>
                  <div className="shrink-0">
                    <div className="w-20 h-16 bg-linear-to-br from-[#F3F4F6] to-[#E5E7EB] rounded border border-[#E5E7EB] overflow-hidden">
                      {cert.image && cert.image !== false ? (
                        <Image src={`/images/certifications/${cert.image}`} alt={`${cert.title} Certificate`} width={80} height={64} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><i className="fas fa-certificate text-[#6B7280] text-xl" /></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`${interClass} text-base font-semibold text-[#1A1A1A] group-hover:text-[#2563EB] transition-colors mb-1`}>{cert.title}</h3>
                    <p className={`${interClass} text-sm text-[#6B7280] mb-2`}>{cert.issuer}</p>
                    <div className={`${interClass} flex items-center gap-4 text-sm text-[#6B7280]`}>
                      <span>{cert.issueDate}</span><span>•</span><span className="capitalize">{cert.category}</span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <svg className="w-5 h-5 text-[#6B7280] group-hover:text-[#2563EB] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Individual Certificate Sections */}
      {visibleCertifications.map((cert) => (
        <section key={cert.id} id={cert.id} ref={certRefs[cert.id]} className="min-h-screen flex items-start relative px-8 bg-linear-to-br from-[#FAF5EE] via-[#F8F2E9] to-[#FAF5EE] pt-20">
          <div className={`max-w-6xl mx-auto w-full section-fade ${visibleSection === cert.id ? 'visible' : 'exit'}`}>
            <div className="flex flex-col lg:flex-row gap-12 mb-16">
              <div className="shrink-0">
                <div className="w-150 h-112.5 bg-linear-to-br from-[#F8FAFC] to-[#F3F4F6] rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xl">
                  {cert.image && cert.image !== false ? (
                    <Image src={`/images/certifications/${cert.image}`} alt={`${cert.title} Certificate`} width={600} height={450} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-center text-[#6B7280] p-12">
                      <div>
                        <i className="fas fa-certificate text-8xl mx-auto mb-6 text-[#6B7280]" />
                        <h3 className={`${spaceGroteskClass} text-2xl font-medium text-[#1A1A1A] mb-3`}>{cert.title}</h3>
                        <p className={`${interClass} text-lg text-[#6B7280]`}>{cert.issuer}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-8">
                <div>
                  <h1 className={`${spaceGroteskClass} text-3xl md:text-4xl font-medium leading-tight text-[#1A1A1A] mb-4`}>{cert.title}</h1>
                  <p className={`${interClass} text-lg text-[#6B7280] mb-6`}>{cert.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MetaField label="Issuing Organization" interClass={interClass}><p className={`${interClass} text-sm text-[#1A1A1A]`}>{cert.issuer}</p></MetaField>
                  <MetaField label="Issue Date" interClass={interClass}><p className={`${interClass} text-sm text-[#1A1A1A]`}>{cert.issueDate}</p></MetaField>
                  <MetaField label="Category" interClass={interClass}><p className={`${interClass} text-sm text-[#1A1A1A] capitalize`}>{cert.category}</p></MetaField>
                  {cert.verificationLink && (
                    <MetaField label="Verification" interClass={interClass}>
                      <a href={cert.verificationLink} target="_blank" rel="noopener noreferrer" className={`${interClass} inline-flex items-center gap-1 text-[#2563EB] hover:text-[#1D4ED8] transition-colors text-sm`}>
                        Verify Certificate
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    </MetaField>
                  )}
                </div>

                {cert.skills?.length > 0 && (
                  <MetaField label="Skills Demonstrated" interClass={interClass}>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, i) => (
                        <span key={i} className={`${interClass} px-2 py-1 bg-[#F3F4F6] text-[#374151] rounded text-xs`}>{skill}</span>
                      ))}
                    </div>
                  </MetaField>
                )}

                {cert.details && (
                  <div className="bg-white rounded p-4 border border-[#E5E7EB]">
                    <h3 className={`${interClass} text-xs font-medium text-[#1A1A1A] mb-2`}>Achievement Details</h3>
                    <p className={`${interClass} text-xs text-[#374151] leading-relaxed`}>{cert.details}</p>
                  </div>
                )}

                {cert.credential && (
                  <div className="bg-white rounded p-4 border border-[#E5E7EB]">
                    <h3 className={`${interClass} text-xs font-medium text-[#374151] uppercase tracking-wide mb-2`}>Credential ID</h3>
                    <p className="font-mono text-xs text-[#1A1A1A] bg-[#FAF5EE] px-2 py-1 rounded">{cert.credential}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Navigation Dots */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-100 flex flex-col items-end">
        <div className="flex flex-col items-end gap-3">
          {['overview', ...visibleCertifications.map(c => c.id)].map((id) => {
            const cert = visibleCertifications.find(c => c.id === id);
            return (
              <button key={id} onClick={() => scrollToSection(id)} className="group flex items-center gap-3">
                <span className={`${interClass} text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 text-[#374151]`}>
                  {id === 'overview' ? 'Overview' : cert?.title}
                </span>
                <div className={`w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150 ${visibleSection === id ? 'bg-[#2563EB] scale-150' : 'bg-[#D1D5DB] hover:bg-[#9CA3AF]'}`} />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-[#F0E6D6]">
        <div className="h-full bg-[#2563EB] transition-transform duration-100" style={{ transform: `scaleX(${scrollProgress / 100})`, transformOrigin: '0%' }} />
      </div>
    </>
  );
}
