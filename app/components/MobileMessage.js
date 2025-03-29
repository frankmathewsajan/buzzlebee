'use client';

import { useEffect } from 'react';

export default function MobileMessage() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('mobile-view');

    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('mobile-view');
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#FDFCFA] flex items-center justify-center p-6 z-[9999] overflow-hidden">
      <div className="relative max-w-[320px] w-full">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#FFE5E5] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#E5F6FF] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-[#E5FFE5] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Main content */}
        <div className="relative text-center space-y-8">
          {/* Icon with gradient border */}
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full blur-md opacity-30 animate-pulse"></div>
            <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="text-gray-900 w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-6">
            <h1 className="font-space-grotesk text-3xl font-bold text-gray-900 leading-tight tracking-tight">
              Mobile View
              <span className="block text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4]">
                Coming Soon
              </span>
            </h1>
            
            <div className="space-y-4">
              <p className="font-inter text-lg text-gray-800 font-medium">
                You&apos;re ahead of the curve! 🚀
              </p>
              <p className="font-inter text-base text-gray-600 leading-relaxed">
                While I craft the perfect mobile experience, try the desktop version for the full showcase.
              </p>
            </div>
          </div>

          {/* Status indicator */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-full">
            <svg
              className="animate-spin h-4 w-4 text-[#4ECDC4]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-sm font-medium text-gray-500">In development</span>
          </div>
        </div>
      </div>
    </div>
  );
}
