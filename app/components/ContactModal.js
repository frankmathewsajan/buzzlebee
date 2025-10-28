'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { trackPortfolioEvents } from '../utils/analytics';
import ExternalLinkModal from './ExternalLinkModal';

const ContactModal = ({ isOpen, onClose, variant = 'contact', hideDirectAccess = false }) => {
  const [showExternalLinkModal, setShowExternalLinkModal] = useState(false);
  const [externalLinkUrl, setExternalLinkUrl] = useState('');
  const [externalLinkName, setExternalLinkName] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    linkedin: '',
    instagram: '',
    discord: '',
    github: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create the email content
      const subject = variant === 'social' 
        ? 'Social Media Follow Request from Portfolio' 
        : 'Contact Form Submission from Portfolio';
      
      const body = variant === 'social' 
        ? `Social Media Follow Request

Name: ${formData.name}
Email: ${formData.email}

Message: ${formData.message}

Social Media Handles:
LinkedIn: ${formData.linkedin || 'Not provided'}
Instagram: ${formData.instagram || 'Not provided'}
Discord: ${formData.discord || 'Not provided'}
GitHub: ${formData.github || 'Not provided'}

Note: This person wants to connect on social media and has provided their handles for follow-back.`
        : `Portfolio Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}

Message: ${formData.message}

Social Media Handles (optional):
LinkedIn: ${formData.linkedin || 'Not provided'}
Instagram: ${formData.instagram || 'Not provided'}
Discord: ${formData.discord || 'Not provided'}
GitHub: ${formData.github || 'Not provided'}`;

      // Create mailto link
      const mailtoLink = `mailto:frankmathewsajan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Track contact form submission
      trackPortfolioEvents.contactFormSubmit(
        variant, 
        !!(formData.linkedin || formData.instagram || formData.discord || formData.github)
      );
      
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          message: '',
          linkedin: '',
          instagram: '',
          discord: '',
          github: ''
        });
        onClose();
        setSubmitStatus(null);
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectSocialLink = (platform) => {
    const links = {
      linkedin: 'https://linkedin.com/in/frankmathewsajan',
      instagram: 'https://instagram.com/franklyy.idk',
      discord: 'https://discord.com/users/frankmathewsajan',
      github: 'https://github.com/frankmathewsajan'
    };
    
    const names = {
      linkedin: 'LinkedIn Profile',
      instagram: 'Instagram Profile',
      discord: 'Discord Profile',
      github: 'GitHub Profile'
    };
    
    if (links[platform]) {
      setExternalLinkUrl(links[platform]);
      setExternalLinkName(names[platform]);
      setShowExternalLinkModal(true);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ExternalLinkModal
        isOpen={showExternalLinkModal}
        onClose={() => setShowExternalLinkModal(false)}
        targetUrl={externalLinkUrl}
        siteName={externalLinkName}
      />
      <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      style={{
        background: 'rgba(231, 223, 216, 0.85)',
        backdropFilter: 'blur(0.5px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div 
        className="relative max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-neutral-800"
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
              {variant === 'social' ? 'SOCIAL.CONNECT' : 'CONTACT.FORM'}
            </h2>
            <p className="text-neutral-600 mt-1 text-sm font-mono">
              {variant === 'social' 
                ? 'CONNECT.REQUEST • PRIVATE.ACCOUNT.ACCESS' 
                : 'MESSAGE.DISPATCH • DIRECT.COMMUNICATION'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-black text-xl font-light 
                       w-8 h-8 flex items-center justify-center 
                       hover:bg-neutral-100 transition-all duration-200 border border-transparent hover:border-neutral-300"
            aria-label="Close form"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            ×
          </button>
        </div>

        {/* Social Direct Access (only for social variant and when not hidden) */}
        {variant === 'social' && !hideDirectAccess && (
          <div className="p-6 border-b border-neutral-200 bg-neutral-50">
            <h3 className="text-sm font-mono text-neutral-700 uppercase tracking-wider mb-3">
              DIRECT.ACCESS
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDirectSocialLink('linkedin')}
                className="flex items-center gap-2 p-3 rounded border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-100 transition-all duration-200 text-sm font-mono"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LINKEDIN
              </button>
              <button
                onClick={() => handleDirectSocialLink('instagram')}
                className="flex items-center gap-2 p-3 rounded border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-100 transition-all duration-200 text-sm font-mono"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                INSTAGRAM
              </button>
              <button
                onClick={() => handleDirectSocialLink('discord')}
                className="flex items-center gap-2 p-3 rounded border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-100 transition-all duration-200 text-sm font-mono"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                DISCORD
              </button>
              <button
                onClick={() => handleDirectSocialLink('github')}
                className="flex items-center gap-2 p-3 rounded border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-100 transition-all duration-200 text-sm font-mono"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GITHUB
              </button>
            </div>
            <div className="mt-4 p-3 rounded bg-amber-50 border border-amber-200">
              <p className="text-xs text-amber-800 font-mono">
                OR • Use form below to provide your handles for follow-back
              </p>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Required Fields */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono text-neutral-700 uppercase tracking-wider">
                REQUIRED.FIELDS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-neutral-600 uppercase tracking-wider mb-2">
                    NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-neutral-300 rounded bg-white font-mono text-sm focus:outline-none focus:border-black transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-neutral-600 uppercase tracking-wider mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-neutral-300 rounded bg-white font-mono text-sm focus:outline-none focus:border-black transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-neutral-600 uppercase tracking-wider mb-2">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full p-3 border border-neutral-300 rounded bg-white font-mono text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder={variant === 'social' 
                    ? "Let me know which social platforms you'd like to connect on and provide your handles for follow-back (especially for Instagram, Discord, and GitHub)..."
                    : "What would you like to discuss?"}
                />
              </div>
            </div>

            {/* Optional Social Handles */}
            <div className="space-y-4">
              <h3 className="text-sm font-mono text-neutral-700 uppercase tracking-wider">
                SOCIAL.HANDLES • OPTIONAL
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="linkedin" className="block text-xs font-mono text-neutral-600 uppercase tracking-wider mb-2">
                    LINKEDIN
                  </label>
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-neutral-300 rounded bg-white font-mono text-sm focus:outline-none focus:border-black transition-colors"
                    placeholder="@username"
                  />
                </div>
                <div>
                  <label htmlFor="instagram" className="block text-xs font-mono text-neutral-600 uppercase tracking-wider mb-2">
                    INSTAGRAM
                  </label>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-neutral-300 rounded bg-white font-mono text-sm focus:outline-none focus:border-black transition-colors"
                    placeholder="@username"
                  />
                </div>
                <div>
                  <label htmlFor="discord" className="block text-xs font-mono text-neutral-600 uppercase tracking-wider mb-2">
                    DISCORD
                  </label>
                  <input
                    type="text"
                    id="discord"
                    name="discord"
                    value={formData.discord}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-neutral-300 rounded bg-white font-mono text-sm focus:outline-none focus:border-black transition-colors"
                    placeholder="username#1234"
                  />
                </div>
                <div>
                  <label htmlFor="github" className="block text-xs font-mono text-neutral-600 uppercase tracking-wider mb-2">
                    GITHUB
                  </label>
                  <input
                    type="text"
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-neutral-300 rounded bg-white font-mono text-sm focus:outline-none focus:border-black transition-colors"
                    placeholder="@username"
                  />
                </div>
              </div>
            </div>

            {/* Submit Status */}
            {submitStatus && (
              <div className={`p-3 rounded border font-mono text-sm ${
                submitStatus === 'success' 
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                {submitStatus === 'success' 
                  ? '✓ EMAIL.CLIENT.OPENED • MESSAGE.PREPARED'
                  : '✗ ERROR.OCCURRED • PLEASE.TRY.AGAIN'}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-4 bg-black text-white rounded font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'PREPARING.EMAIL...' : 'SEND.MESSAGE'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default ContactModal;
