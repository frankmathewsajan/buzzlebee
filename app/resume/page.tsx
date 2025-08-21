"use client";

import { useState, useEffect } from "react";
import PortfolioMap from "../components/PortfolioMap";
import ExternalLinkModal from "../components/ExternalLinkModal";
import "./resume.css";

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showExternalModal, setShowExternalModal] = useState(false);
  const [externalLinkUrl, setExternalLinkUrl] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleExternalLinkModal = (isOpen: boolean, url = "") => {
    setShowExternalModal(isOpen);
    setExternalLinkUrl(url);
    if (isOpen) {
      setShowPortfolioModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="resume-container">
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="futuristic-loader">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="loader-ring"></div>
              ))}
            </div>
            <h2 className="loading-title">Loading Resume</h2>
            <p className="loading-subtitle">Preparing your experience...</p>
          </div>
          <div className="geometric-bg">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`geo-shape shape-${i + 1}`}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="resume-container">
      <div className="pdf-container">
        {/* Portfolio Map Button */}
        <div 
          className={`portfolio-map-button ${showExternalModal ? "hidden" : ""}`}
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
          src="/files/FrankMathewSajan_08202025.pdf#zoom=125"
          className={`pdf-viewer ${showPortfolioModal || showExternalModal ? "hidden" : ""}`}
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
    </div>
  );
}
