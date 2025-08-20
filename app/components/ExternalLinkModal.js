'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaLink, FaTimes, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ExternalLinkModal = ({ isOpen, onClose, targetUrl, siteName = 'External Site' }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, handleClose]);

  const handleProceed = () => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div 
      className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 ${
        isClosing ? 'modal-backdrop-closing' : 'modal-backdrop'
      }`}
      style={{
        background: 'rgba(231, 223, 216, 0.85)',
        backdropFilter: 'blur(0.5px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <motion.div 
        className="relative max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-neutral-800"
        style={{
          background: 'linear-gradient(145deg, #fafaf9 0%, #f5f5f4 50%, #e7e5e4 100%)',
          borderRadius: '4px'
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle tech grid overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
             style={{
               backgroundImage: `
                 linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
               `,
               backgroundSize: '20px 20px'
             }}>
        </div>

        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-8 h-8">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-black"></div>
          <div className="absolute top-0 left-0 w-[1px] h-full bg-black"></div>
        </div>
        <div className="absolute top-0 right-0 w-8 h-8">
          <div className="absolute top-0 right-0 w-full h-[1px] bg-black"></div>
          <div className="absolute top-0 right-0 w-[1px] h-full bg-black"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-8 h-8">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black"></div>
          <div className="absolute bottom-0 left-0 w-[1px] h-full bg-black"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8">
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-black"></div>
          <div className="absolute bottom-0 right-0 w-[1px] h-full bg-black"></div>
        </div>

        {/* Header */}
        <div className="relative flex justify-between items-center p-6 border-b border-neutral-300"
             style={{ background: 'linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)' }}>
          <div>
            <h2 className="text-2xl font-light text-black tracking-wide" 
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.05em' }}>
              EXTERNAL.LINK
            </h2>
            <p className="text-neutral-600 mt-1 text-sm font-mono">
              REDIRECT.REQUEST • EXTERNAL.NAVIGATION
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-neutral-400 hover:text-black text-xl font-light 
                       w-8 h-8 flex items-center justify-center 
                       hover:bg-neutral-100 transition-all duration-200 border border-transparent hover:border-neutral-300"
            aria-label="Close modal"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            

            {/* Destination Info */}
            <div className="space-y-3">
              <h4 className="text-sm font-mono text-neutral-700 uppercase tracking-wider">
                DESTINATION.URL
              </h4>
              <div className="bg-neutral-100 rounded p-4 border border-neutral-200">
                <p className="text-sm font-mono text-neutral-900 break-all bg-white px-3 py-2 rounded border border-neutral-300">
                  {targetUrl}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-300 flex space-x-3"
             style={{ background: 'linear-gradient(180deg, #f5f5f4 0%, #fafaf9 100%)' }}>
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-3 text-neutral-700 bg-neutral-200 hover:bg-neutral-300 rounded font-mono uppercase tracking-wider transition-all duration-200 text-sm border border-neutral-300 hover:border-neutral-400"
          >
            CANCEL
          </button>
          <button
            onClick={handleProceed}
            className="flex-1 px-4 py-3 bg-black hover:bg-neutral-800 text-white rounded font-mono uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
          >
            <span>CONTINUE</span>
            <FaArrowRight className="text-xs" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ExternalLinkModal;
