'use client';

import { useMemo, useState } from 'react';
import ExternalLinkModal from '@/app/components/ExternalLinkModal';

export default function CaseStudiesClient({ caseStudies, spaceGroteskClass, interClass }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showExternalLinkModal, setShowExternalLinkModal] = useState(false);
  const [externalLinkUrl, setExternalLinkUrl] = useState('');
  const [externalLinkName, setExternalLinkName] = useState('');

  const studiesPerPage = 4;
  const totalPages = Math.ceil(caseStudies.length / studiesPerPage);

  const currentStudies = useMemo(
    () => caseStudies.slice((currentPage - 1) * studiesPerPage, currentPage * studiesPerPage),
    [caseStudies, currentPage],
  );

  const handleCaseStudyClick = (caseStudy) => {
    if (caseStudy.links.caseStudy && caseStudy.links.caseStudy !== '#') {
      setExternalLinkUrl(caseStudy.links.caseStudy);
      setExternalLinkName(`${caseStudy.title} - Case Study`);
      setShowExternalLinkModal(true);
    }
  };

  return (
    <>
      <ExternalLinkModal
        isOpen={showExternalLinkModal}
        onClose={() => setShowExternalLinkModal(false)}
        targetUrl={externalLinkUrl}
        siteName={externalLinkName}
      />

      <style jsx global>{`
        .fade-up-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUpIn 0.6s ease forwards;
        }

        @keyframes fadeUpIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .group\/card:hover ~ .group\/card,
        .group\/card:has(~ .group\/card:hover) {
          opacity: 0.5;
          filter: blur(2px);
          transform: scale(0.98);
        }

        .group\/card:hover {
          opacity: 1;
          filter: blur(0);
          transform: scale(1);
        }
      `}</style>

      <div className="h-screen overflow-hidden bg-[#FFEBD0]">
        <div className="relative mx-auto flex h-full max-w-7xl px-8 py-8">
          <div className="flex flex-1 flex-col">
            <div className="fade-up-in mb-8 max-w-2xl">
              <h1 className={`${spaceGroteskClass} mb-4 text-4xl leading-none text-[#1A365D] md:text-6xl`}>
                Case Studies
              </h1>
              <p className={`${interClass} max-w-100 text-justify text-sm font-light leading-relaxed text-[#1A365D]/60`}>
                Detailed technical case studies showcasing my solutions and their measurable impact across various domains.
              </p>
            </div>

            <div className="relative grid flex-1 grid-cols-1 gap-8 md:grid-cols-2">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-px w-full bg-[#1A365D]/20" />
                <div className="absolute h-full w-px bg-[#1A365D]/20" />
              </div>

              {currentStudies.map((caseStudy, index) => (
                <button
                  key={caseStudy.id}
                  onClick={() => handleCaseStudyClick(caseStudy)}
                  className="group/card fade-up-in relative block cursor-pointer text-left transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="group h-full space-y-4">
                    <div className="space-y-2">
                      <p className={`${interClass} text-sm text-[#1A365D]`}>{caseStudy.category}</p>
                      <h2 className={`${spaceGroteskClass} text-xl text-[#1A365D] transition-colors duration-200 group-hover:text-[#1A365D]/80 md:text-2xl`}>
                        {caseStudy.title}
                      </h2>
                    </div>

                    <p className={`${interClass} line-clamp-3 text-sm leading-relaxed text-[#1A365D]/80`}>
                      {caseStudy.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {caseStudy.tags?.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className={`${interClass} rounded-full bg-[#1A365D]/10 px-3 py-1 text-xs text-[#1A365D]`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="fixed right-8 top-1/2 flex -translate-y-1/2 flex-col items-center justify-center gap-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-[#1A365D] text-[#FFEBD0]'
                      : 'bg-[#1A365D]/10 text-[#1A365D] hover:bg-[#1A365D]/20'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
