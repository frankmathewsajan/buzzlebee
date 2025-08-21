"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaLink, FaArrowRight } from "react-icons/fa";

interface ExternalLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
  siteName?: string;
}

export default function ExternalLinkModal({ 
  isOpen, 
  onClose, 
  targetUrl, 
  siteName = "External Site" 
}: ExternalLinkModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handleClose]);

  const handleProceed = () => {
    window.open(targetUrl, "_blank", "noopener,noreferrer");
    handleClose();
  };

  if (!isOpen && !isClosing) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      style={{
        background: "rgba(231, 223, 216, 0.85)",
        backdropFilter: "blur(0.5px)"
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div 
        className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-white/50"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaLink className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">External Link</h2>
          <p className="text-gray-600">
            You&apos;re about to visit <span className="font-semibold">{siteName}</span>
          </p>
        </div>

        {/* URL Display */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border">
          <p className="text-sm text-gray-600 mb-1">Destination:</p>
          <p className="text-sm font-mono text-gray-800 break-all">{targetUrl}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleProceed}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            Continue
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}
