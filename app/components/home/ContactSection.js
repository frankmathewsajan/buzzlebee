'use client';

import Link from "next/link";
import { FaGithub, FaLinkedin, FaDiscord, FaInstagram, FaLink } from 'react-icons/fa';
import Tooltip from '../Tooltip';
import { memo } from "react";
import contactContent from '@/data/content/home/contact-content.json';

const ICON_MAP = {
  github: FaGithub,
  linkedin: FaLinkedin,
  discord: FaDiscord,
  instagram: FaInstagram,
};

const ContactSection = memo(({ 
  sectionRef, 
  isVisible, 
  contactOpacity, 
  handleExternalLink, 
  handleSocialLinkClick 
}) => {
  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center bg-[#e7dfd8] transition-all duration-1000 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
      }`}
    >
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 transition-opacity duration-700 ease-in-out"
        style={{ opacity: contactOpacity }}
      >
        {/* Main Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="flex items-center justify-center lg:justify-start">
            <h2 className="font-thin uppercase tracking-tight text-gray-700" style={
              { fontSize: '8vw', 
              fontFamily: 'RecifeDisplay, serif', 
              lineHeight: '0.9' }
              }>{contactContent.title}</h2>
          </div>

          <div className="">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {contactContent.intro[0].split('built')[0]}
                <Tooltip content="Check out my projects →">
                  <Link href="/projects" className="text-orange-600 font-semibold underline decoration-orange-300 hover:bg-orange-50 px-1 rounded transition-colors cursor-pointer">
                    built
                  </Link>
                </Tooltip>
                {contactContent.intro[0].split('built')[1].split('value')[0]}
                <Tooltip content="Read my thoughts →">
                  <button 
                    onClick={() => handleExternalLink('https://medium.com/@frankmathewsajan')}
                    className="text-orange-600 font-semibold underline decoration-orange-300 hover:bg-orange-50 px-1 rounded transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    value
                  </button>
                </Tooltip>
                {contactContent.intro[0].split('value')[1].split('contribute')[0]}
                <span className="text-orange-600 font-semibold">contribute</span>{' '}
                {contactContent.intro[0].split('contribute')[1]}
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {contactContent.intro[1].split('real world systems')[0]}
                <span className="font-medium text-orange-600">real world systems</span> with{' '}
                <span className="font-medium text-orange-600">intelligent automation</span>{' '}
                - across domains like{' '}
                <span className="font-medium text-orange-500">IoT</span>,{' '}
                <span className="font-medium text-orange-500">environmental tech</span>, and{' '}
                <span className="font-medium text-orange-500">health & safety</span>.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {contactContent.intro[2].split('contact me')[0]}
                <span className="font-semibold text-gray-800">contact me</span>
                {contactContent.intro[2].split('contact me')[1].split('new projects')[0]}{' '}
                <span className="font-medium text-orange-500">new projects</span>,{' '}
                <span className="font-medium text-orange-500">creative ideas</span>, or{' '}
                <span className="font-medium text-orange-500">opportunities</span>{' '}
                to contribute to your visions.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-t border-gray-300/50 pt-12">
          <div className="flex flex-col md:flex-row md:justify-between md:space-x-8 relative">
            {/* Site Map */}
            <div className="mb-8 md:mb-0">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 font-sans">Quick Links</h4>
              <div className="grid grid-cols-2 gap-x-0 gap-y-3">
                {contactContent.quickLinks.map((item) => (
                  item.external ? (
                    <button
                      key={item.name}
                      onClick={() => handleExternalLink(item.href)}
                      className="flex text-gray-600 hover:text-gray-900 transition-colors duration-300 text-left items-center gap-1"
                    >
                      {item.name}
                      <FaLink className="w-3 h-3" />
                    </button>
                  ) : (
                    <Link key={item.name} href={item.href} className="block text-gray-600 hover:text-gray-900 transition-colors duration-300">
                      {item.name}
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="relative mb-8 md:mb-0">
              <div className="hidden md:block absolute -left-4 top-0 h-full w-px bg-gray-300/30"></div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-4 font-sans">Explore</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-x-0">
                  {contactContent.socialLinks.slice(0, 2).map((item) => {
                    const Icon = ICON_MAP[item.platform] ?? FaLink;
                    const hoverClass = item.platform === 'linkedin' ? 'hover:text-blue-600' : 'hover:text-gray-900';
                    return (
                      <button
                        key={item.platform}
                        onClick={() => handleSocialLinkClick(item.platform, item.url)}
                        className={`flex items-center gap-2 text-gray-600 ${hoverClass} transition-colors duration-300 text-left ${item.platform === 'github' ? 'relative group' : ''}`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                        {item.platform === 'github' && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Connect
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="grid grid-cols-2 gap-x-0">
                  {contactContent.socialLinks.slice(2, 4).map((item) => {
                    const Icon = ICON_MAP[item.platform] ?? FaLink;
                    const hoverClass = item.platform === 'discord' ? 'hover:text-indigo-600' : 'hover:text-pink-600';
                    const badgeClass = item.platform === 'discord' ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800';
                    return (
                      <button
                        key={item.platform}
                        onClick={() => handleSocialLinkClick(item.platform, item.url)}
                        className={`flex items-center gap-2 text-gray-600 ${hoverClass} transition-colors duration-300 text-left relative group`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                        <span className={`text-xs ${badgeClass} px-2 py-1 rounded-full ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                          Private
                        </span>
                      </button>
                    );
                  })}
                </div>
                {contactContent.socialLinks.slice(4).map((item) => (
                <button 
                  key={item.platform}
                  onClick={() => handleSocialLinkClick(item.platform, item.url)}
                  className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors duration-300 text-left w-full"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {item.label}
                </button>
                ))}
              </div>
              
              <div className="hidden md:block absolute -right-4 top-0 h-full w-px bg-gray-300/30"></div>
            </div>

            {/* Info Section */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 font-sans">{contactContent.siteInfo.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {contactContent.siteInfo.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {contactContent.siteInfo.stack.map((item) => (
                  <span key={item} className="px-2 py-1 bg-white/50 rounded text-xs text-gray-600">{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-300/30">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                © {new Date().getFullYear()} Frank Mathew Sajan. All rights reserved.
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span>Last updated: {contactContent.siteInfo.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
