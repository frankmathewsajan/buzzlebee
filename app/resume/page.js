"use client";

import { useState, useEffect } from "react";
import PortfolioMap from "../components/PortfolioMap";
import "./resume.css";

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [pdfLoaded, setPdfLoaded] = useState(false);

  useEffect(() => {
    // Simulate PDF loading time with minimum 2 seconds for the loading animation
    const minLoadTime = 2000;
    const startTime = Date.now();

    const handlePdfLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);
      
      setTimeout(() => {
        setPdfLoaded(true);
        setIsLoading(false);
      }, remainingTime);
    };

    // Create iframe to preload PDF
    const iframe = document.createElement('iframe');
    iframe.src = '/files/FrankMathewSajan_08202025.pdf';
    iframe.style.display = 'none';
    iframe.onload = handlePdfLoad;
    iframe.onerror = handlePdfLoad; // Handle load errors gracefully
    
    document.body.appendChild(iframe);

    // Cleanup
    return () => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    };
  }, []);

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
          {/* Portfolio Map - positioned on right middle */}
          <div className="portfolio-map-wrapper">
            <PortfolioMap />
          </div>
          
          <iframe
            src="/files/FrankMathewSajan_08202025.pdf#zoom=125"
            className="pdf-viewer"
            title="Frank Mathew Sajan Resume"
          />
        </div>
      )}
    </div>
  );
}
