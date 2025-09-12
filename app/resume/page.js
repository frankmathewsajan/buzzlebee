"use client";

import { useState, useEffect } from "react";
import PortfolioMap from "../components/PortfolioMap";
import ExternalLinkModal from "../components/ExternalLinkModal";
import { trackPortfolioEvents } from "../utils/analytics";
import "./resume.css";

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showExternalModal, setShowExternalModal] = useState(false);
  const [externalLinkUrl, setExternalLinkUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    // Function to get PDF URL based on hash
    const getPdfUrl = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        return `/files/FrankMathewSajan_${hash}.pdf`;
      }
      return '/files/FrankMathewSajan_08202025.pdf'; // Default PDF
    };

    // Function to check if PDF exists
    const checkPdfExists = async (url) => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
      } catch (error) {
        return false;
      }
    };

    // Initialize PDF URL
    const initializePdfUrl = async () => {
      const targetPdfUrl = getPdfUrl();
      const pdfExists = await checkPdfExists(targetPdfUrl);
      
      const finalPdfUrl = pdfExists ? targetPdfUrl : '/files/FrankMathewSajan_08202025.pdf';
      setPdfUrl(finalPdfUrl);

      // Simulate PDF loading time with minimum 2 seconds for the loading animation
      const minLoadTime = 2000;
      const startTime = Date.now();

      const handlePdfLoad = () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);
        
        setTimeout(() => {
          setPdfLoaded(true);
          setIsLoading(false);
          
          // Track resume view
          trackPortfolioEvents.resumeView();
        }, remainingTime);
      };

      // Create iframe to preload PDF
      const iframe = document.createElement('iframe');
      iframe.src = finalPdfUrl;
      iframe.style.display = 'none';
      iframe.onload = handlePdfLoad;
      iframe.onerror = handlePdfLoad; // Handle load errors gracefully
      
      document.body.appendChild(iframe);

      // Cleanup function
      return () => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      };
    };

    // Handle hash changes
    const handleHashChange = () => {
      // Restart the loading process when hash changes
      setIsLoading(true);
      setPdfLoaded(false);
      initializePdfUrl();
    };

    // Initialize on mount
    const cleanup = initializePdfUrl();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);

  // Handle external link modal state from PortfolioMap
  const handleExternalLinkModal = (isOpen, url = '') => {
    console.log('External modal state changed:', isOpen, url);
    setShowExternalModal(isOpen);
    setExternalLinkUrl(url);
    if (isOpen) {
      // Hide portfolio modal when external link modal opens
      setShowPortfolioModal(false);
    }
  };

  return (
    <div className="resume-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="futuristic-loader">
              <div className="loader-ring"></div>
              <div className="loader-ring"></div>
              <div className="loader-ring"></div>
            </div>
            <h2 className="loading-title">Loading Resume</h2>
            <p className="loading-subtitle">Preparing your experience...</p>
          </div>
          <div className="geometric-bg">
            <div className="geo-shape shape-1"></div>
            <div className="geo-shape shape-2"></div>
            <div className="geo-shape shape-3"></div>
            <div className="geo-shape shape-4"></div>
            <div className="geo-shape shape-5"></div>
          </div>
        </div>
      )}
      
      {!isLoading && (
        <div className="pdf-container">
          {/* Fixed Portfolio Map Button */}
          <div 
            className={`portfolio-map-button ${showExternalModal ? 'hidden' : ''}`}
            onClick={() => setShowPortfolioModal(true)}
          >
            <div className="portfolio-map-icon">
              <svg 
                className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-all duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" 
                />
              </svg>
            </div>
          </div>
          
          {/* PDF Viewer */}
          <iframe
            src={`${pdfUrl}#zoom=125`}
            className={`pdf-viewer ${showPortfolioModal || showExternalModal ? 'hidden' : ''}`}
            title="Frank Mathew Sajan Resume"
          />

          {/* Portfolio Map Modal */}
          {showPortfolioModal && (
            <div className="portfolio-modal-overlay">
              <div className="portfolio-modal-backdrop" onClick={() => setShowPortfolioModal(false)} />
              <div className="portfolio-modal-content">
                <PortfolioMap 
                  onClose={() => setShowPortfolioModal(false)} 
                  autoOpen={true}
                  onExternalLinkModal={handleExternalLinkModal}
                  disableInternalExternalModal={true}
                />
              </div>
            </div>
          )}
          
          {/* External Link Modal */}
          {showExternalModal && (
            <ExternalLinkModal
              isOpen={showExternalModal}
              onClose={() => handleExternalLinkModal(false)}
              targetUrl={externalLinkUrl}
              siteName="Medium Blog"
            />
          )}
        </div>
      )}
    </div>
  );
}
