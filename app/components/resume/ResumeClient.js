'use client';

import { useState, useEffect } from 'react';
import PortfolioMap from '@/app/components/PortfolioMap';
import ExternalLinkModal from '@/app/components/ExternalLinkModal';

export default function ResumeClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [extModal, setExtModal] = useState({ open: false, url: '' });
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const getPdfUrl = () => {
      const hash = window.location.hash.replace('#', '');
      return hash ? `/files/FrankMathewSajan_${hash}.pdf` : '/files/FrankMathewSajan_07012026.pdf';
    };

    const initializePdfUrl = async () => {
      const targetUrl = getPdfUrl();
      let finalUrl = targetUrl;
      try {
        const res = await fetch(targetUrl, { method: 'HEAD' });
        if (!res.ok) finalUrl = '/files/FrankMathewSajan_07012026.pdf';
      } catch {
        finalUrl = '/files/FrankMathewSajan_07012026.pdf';
      }
      setPdfUrl(finalUrl);

      const startTime = Date.now();
      const iframe = document.createElement('iframe');
      iframe.src = finalUrl;
      iframe.style.display = 'none';
      const onDone = () => {
        const remaining = Math.max(0, 2000 - (Date.now() - startTime));
        setTimeout(() => setIsLoading(false), remaining);
      };
      iframe.onload = onDone;
      iframe.onerror = onDone;
      document.body.appendChild(iframe);
      return () => { if (document.body.contains(iframe)) document.body.removeChild(iframe); };
    };

    const handleHashChange = () => { setIsLoading(true); initializePdfUrl(); };
    const cleanup = initializePdfUrl();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  const handleExtModal = (open, url = '') => {
    setExtModal({ open, url });
    if (open) setShowPortfolioModal(false);
  };

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="futuristic-loader">
              <div className="loader-ring" />
              <div className="loader-ring" />
              <div className="loader-ring" />
            </div>
            <h2 className="loading-title">Loading Resume</h2>
            <p className="loading-subtitle">Preparing your experience...</p>
          </div>
          <div className="geometric-bg">
            <div className="geo-shape shape-1" />
            <div className="geo-shape shape-2" />
            <div className="geo-shape shape-3" />
            <div className="geo-shape shape-4" />
            <div className="geo-shape shape-5" />
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="pdf-container">
          <div
            className={`portfolio-map-button ${extModal.open ? 'hidden' : ''}`}
            onClick={() => setShowPortfolioModal(true)}
          >
            <div className="portfolio-map-icon">
              <svg className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </div>

          <iframe
            src={`${pdfUrl}#zoom=125`}
            className={`pdf-viewer ${showPortfolioModal || extModal.open ? 'hidden' : ''}`}
            title="Frank Mathew Sajan Resume"
          />

          {showPortfolioModal && (
            <div className="portfolio-modal-overlay">
              <div className="portfolio-modal-backdrop" onClick={() => setShowPortfolioModal(false)} />
              <div className="portfolio-modal-content">
                <PortfolioMap
                  onClose={() => setShowPortfolioModal(false)}
                  autoOpen={true}
                  onExternalLinkModal={handleExtModal}
                  disableInternalExternalModal={true}
                />
              </div>
            </div>
          )}

          {extModal.open && (
            <ExternalLinkModal
              isOpen={extModal.open}
              onClose={() => handleExtModal(false)}
              targetUrl={extModal.url}
              siteName="Medium Blog"
            />
          )}
        </div>
      )}
    </>
  );
}
