'use client';

import { useState } from 'react';
import ExternalLinkModal from '@/app/components/ExternalLinkModal';

const STUDIES_PER_PAGE = 4;

export default function CaseStudyGrid({ caseStudies, spaceGroteskClass, interClass }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({ open: false, url: '', name: '' });

  const totalPages = Math.ceil(caseStudies.length / STUDIES_PER_PAGE);
  const currentStudies = caseStudies.slice(
    (currentPage - 1) * STUDIES_PER_PAGE,
    currentPage * STUDIES_PER_PAGE
  );

  const handleClick = (e, study) => {
    e.preventDefault();
    if (study.links.caseStudy && study.links.caseStudy !== '#') {
      setModal({ open: true, url: study.links.caseStudy, name: `${study.title} - Case Study` });
    }
  };

  return (
    <>
      <style jsx global>{`
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

      <ExternalLinkModal
        isOpen={modal.open}
        onClose={() => setModal(s => ({ ...s, open: false }))}
        targetUrl={modal.url}
        siteName={modal.name}
      />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-px bg-[#1A365D]/20" />
          <div className="absolute w-px h-full bg-[#1A365D]/20" />
        </div>

        {currentStudies.map((study, i) => (
          <div
            key={study.id}
            onClick={(e) => handleClick(e, study)}
            className="relative block transition-all duration-300 group/card cursor-pointer animate-entry-fade-up group"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
              <div className="h-full flex flex-col space-y-4">
                <div className="space-y-2">
                  <p className={`${interClass} text-sm text-[#1A365D]`}>{study.category}</p>
                  <h2 className={`${spaceGroteskClass} text-xl md:text-2xl text-[#1A365D] group-hover:text-[#1A365D]/80 transition-colors duration-200`}>
                    {study.title}
                  </h2>
                </div>
                <p className={`${interClass} text-sm text-[#1A365D]/80 leading-relaxed line-clamp-3`}>
                  {study.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {study.tags?.slice(0, 4).map((tech, j) => (
                    <span key={j} className={`${interClass} text-xs px-3 py-1 rounded-full bg-[#1A365D]/10 text-[#1A365D]`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
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
    </>
  );
}
