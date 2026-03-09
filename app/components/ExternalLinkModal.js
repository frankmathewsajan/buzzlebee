'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import ModalFrame from './ModalFrame';

const MODAL_CLOSE_MS = 220;

const ExternalLinkModal = ({ isOpen, onClose, targetUrl, siteName = 'External Site' }) => {
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef(null);

  const handleClose = useCallback(() => {
    if (isClosing) {
      return;
    }

    setIsClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, MODAL_CLOSE_MS);
  }, [isClosing, onClose]);

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
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [isOpen, handleClose]);

  const handleProceed = () => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'rgba(231, 223, 216, 0.85)',
        backdropFilter: 'blur(0.5px)',
        zIndex: 99999,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <ModalFrame
        title="EXTERNAL.LINK"
        subtitle="REDIRECT.REQUEST • EXTERNAL.NAVIGATION"
        onClose={handleClose}
        closeLabel="Close modal"
        footer={(
          <>
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
          </>
        )}
      >
          <div className="space-y-6">
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
      </ModalFrame>
    </div>
  );
};

export default ExternalLinkModal;
