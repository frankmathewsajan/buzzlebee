"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ContactFormData, ContactModalVariant } from "../../types";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: ContactModalVariant;
  hideDirectAccess?: boolean;
}

const socialLinks = {
  linkedin: "https://linkedin.com/in/frankmathewsajan",
  instagram: "https://instagram.com/franklyy.idk",
  discord: "https://discord.com/users/frankmathewsajan",
  github: "https://github.com/frankmathewsajan",
};

export default function ContactModal({ isOpen, onClose, variant = "contact", hideDirectAccess = false }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    linkedin: "",
    instagram: "",
    discord: "",
    github: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const subject = variant === "social" 
        ? "Social Media Follow Request from Portfolio" 
        : variant === "gmail"
        ? "Direct Contact from Portfolio"
        : "Contact Form Submission from Portfolio";
      
      const body = variant === "social" 
        ? `Social Media Follow Request

Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}

Social Media Handles:
LinkedIn: ${formData.linkedin || "Not provided"}
Instagram: ${formData.instagram || "Not provided"}
Discord: ${formData.discord || "Not provided"}
GitHub: ${formData.github || "Not provided"}

Note: This person wants to connect on social media and has provided their handles for follow-back.`
        : `Portfolio Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}

Social Media Handles (optional):
LinkedIn: ${formData.linkedin || "Not provided"}
Instagram: ${formData.instagram || "Not provided"}
Discord: ${formData.discord || "Not provided"}
GitHub: ${formData.github || "Not provided"}`;

      const mailtoLink = `mailto:frankmathewsajan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      
      setSubmitStatus("success");
      
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          message: "",
          linkedin: "",
          instagram: "",
          discord: "",
          github: "",
        });
        onClose();
        setSubmitStatus(null);
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectSocialLink = (platform: keyof typeof socialLinks) => {
    const url = socialLinks[platform];
    if (url) {
      window.open(url, "_blank");
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = {
    contact: {
      title: "Let's Connect",
      subtitle: "I'd love to hear from you! Send me a message and I'll get back to you soon.",
      showSocialInputs: false,
    },
    social: {
      title: "Social Media Connect",
      subtitle: "Let's connect on social media! Fill out the form below and I'll follow you back.",
      showSocialInputs: true,
    },
    gmail: {
      title: "Send Direct Email",
      subtitle: "This will open your email client to send me a direct message.",
      showSocialInputs: false,
    },
  };

  const content = modalContent[variant];

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{content.title}</h2>
          <p className="text-gray-600 text-sm">{content.subtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />

          {content.showSocialInputs && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Social Media Handles (Optional)</h3>
              <div className="grid grid-cols-1 gap-3">
                {["linkedin", "instagram", "discord", "github"].map((platform) => (
                  <input
                    key={platform}
                    type="text"
                    name={platform}
                    placeholder={`Your ${platform.charAt(0).toUpperCase() + platform.slice(1)} handle`}
                    value={formData[platform as keyof ContactFormData] || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-center">
            ✓ Email client opened! Your message is ready to send.
          </div>
        )}
        
        {submitStatus === "error" && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
            ✗ Something went wrong. Please try again.
          </div>
        )}

        {/* Direct Social Links */}
        {!hideDirectAccess && variant !== "gmail" && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-center text-sm font-medium text-gray-700 mb-4">Or connect directly:</h3>
            <div className="flex justify-center gap-3">
              {(["linkedin", "github"] as const).map((platform) => (
                <button
                  key={platform}
                  onClick={() => handleDirectSocialLink(platform)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title={`Connect on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
                >
                  <i className={`fab fa-${platform} text-xl`} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
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
