'use client';

import { useState, useEffect } from 'react';

export default function DevNotice() {
  const [showDevNotice, setShowDevNotice] = useState(false);

  // Check if user has seen the development notice
  useEffect(() => {
    const hasSeenNotice = localStorage.getItem('hasSeenDevNotice');
    if (!hasSeenNotice) {
      setShowDevNotice(true);
    }
  }, []);

  const dismissDevNotice = () => {
    setShowDevNotice(false);
    localStorage.setItem('hasSeenDevNotice', 'true');
  };

  if (!showDevNotice) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">
                <span className="font-semibold text-yellow-400">Development Notice:</span> This portfolio is currently in <span className="font-semibold">beta stage</span>. Some content may be placeholder data or subject to change.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={dismissDevNotice}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200"
            >
              Got it
              <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
