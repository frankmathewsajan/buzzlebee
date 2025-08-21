"use client";

import { useEffect } from "react";

export default function MobileMessage() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#FDFCFA] flex items-center justify-center p-6 z-[9999] overflow-hidden">
      <div className="relative max-w-[320px] w-full">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#FFE5E5] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#E5F6FF] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-[#E5FFE5] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Main content */}
        <div className="relative text-center space-y-8">
          {/* Icon */}
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-full blur-md opacity-30 animate-pulse"></div>
            <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="text-gray-900 w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
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
            <h1 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight">
              Desktop Experience Only
            </h1>
            
            <div className="space-y-4 text-gray-600">
              <p className="text-lg leading-relaxed">
                This portfolio is optimized for desktop viewing to showcase interactive elements and detailed project information.
              </p>
              
              <p className="text-sm">
                For the best experience, please visit on a desktop or laptop computer.
              </p>
            </div>

            {/* Contact info */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
              <p className="text-sm text-gray-700 mb-3 font-medium">
                Get in touch:
              </p>
              <a 
                href="mailto:frankmathewsajan@gmail.com"
                className="text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
              >
                frankmathewsajan@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
