'use client';

import { useRouter } from "next/navigation";
import { useRef, useState, useMemo, useCallback } from "react";
import { Space_Grotesk } from 'next/font/google';

// Components
import PortfolioMap from './components/PortfolioMap';
import ContactModal from './components/ContactModal';
import ExternalLinkModal from './components/ExternalLinkModal';
import HeroSection from './components/i/HeroSection';
import AboutSection from './components/i/AboutSection';
import ProjectsSection from './components/i/ProjectsSection';
import ContactSection from './components/i/ContactSection';

// Data and Hooks
import projectsData from './projects.json';
import { useScrollAndVisibility } from './hooks/useScrollAndVisibility';

// Font setup
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const router = useRouter();
  const indexProjects = projectsData.filter(project => project.SHOW_IN_INDEX);

  // Refs
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = useMemo(() => ({
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    contact: contactRef
  }), []);

  // Custom hook for scroll and visibility
  const viewState = useScrollAndVisibility(sectionRefs);

  // Modal states
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactModalSource, setContactModalSource] = useState('social');
  const [showExternalLinkModal, setShowExternalLinkModal] = useState(false);
  const [externalLinkUrl, setExternalLinkUrl] = useState('');

  // Handlers
  const handleExternalLink = useCallback((url) => {
    setExternalLinkUrl(url);
    setShowExternalLinkModal(true);
  }, []);

  const handleSocialLinkClick = useCallback((platform, url) => {
    if (platform === 'instagram' || platform === 'discord' || platform === 'github' || platform === 'gmail') {
      setContactModalSource(platform === 'gmail' ? 'gmail' : 'social');
      setContactModalOpen(true);
    } else {
      window.open(url, '_blank');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#e7dfd8]">
      <PortfolioMap />

      <HeroSection
        sectionRef={homeRef}
        isVisible={viewState.sectionVisibility.home}
      />

      <AboutSection
        sectionRef={aboutRef}
        isVisible={viewState.sectionVisibility.about}
      />

      <ProjectsSection
        sectionRef={projectsRef}
        isVisible={viewState.sectionVisibility.projects}
        projectsOpacity={viewState.projectsOpacity}
        indexProjects={indexProjects}
        router={router}
        spaceGrotesk={spaceGrotesk}
      />

      <ContactSection
        sectionRef={contactRef}
        isVisible={viewState.sectionVisibility.contact}
        contactOpacity={viewState.contactOpacity}
        handleExternalLink={handleExternalLink}
        handleSocialLinkClick={handleSocialLinkClick}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        variant={contactModalSource === 'gmail' ? 'contact' : 'social'}
        hideDirectAccess={contactModalSource === 'gmail'}
      />

      {showExternalLinkModal && (
        <ExternalLinkModal
          isOpen={showExternalLinkModal}
          onClose={() => setShowExternalLinkModal(false)}
          targetUrl={externalLinkUrl}
        />
      )}
    </div>
  );
}
