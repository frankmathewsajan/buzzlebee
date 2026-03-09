'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import PortfolioMap from '@/app/components/PortfolioMap';
import ContactModal from '@/app/components/ContactModal';
import ExternalLinkModal from '@/app/components/ExternalLinkModal';
import HeroSection from '@/app/components/home/HeroSection';
import AboutSection from '@/app/components/home/AboutSection';
import ProjectsSection from '@/app/components/home/ProjectsSection';
import ContactSection from '@/app/components/home/ContactSection';
import { useScrollAndVisibility } from '@/app/hooks/useScrollAndVisibility';

const MODAL_PLATFORMS = new Set(['instagram', 'discord', 'github', 'gmail']);

export default function HomeClient({ indexProjects, sgClass }) {
  const router = useRouter();
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const viewState = useScrollAndVisibility({
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    contact: contactRef,
  });
  const [modal, setModal] = useState({ contact: false, source: 'social', external: false, url: '' });

  const handleExternalLink = (url) => setModal(s => ({ ...s, external: true, url }));
  const handleSocialLinkClick = (platform, url) => {
    if (MODAL_PLATFORMS.has(platform)) {
      setModal(s => ({ ...s, contact: true, source: platform === 'gmail' ? 'gmail' : 'social' }));
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <>
      <PortfolioMap />
      <HeroSection sectionRef={homeRef} isVisible={viewState.sectionVisibility.home} />
      <AboutSection sectionRef={aboutRef} isVisible={viewState.sectionVisibility.about} />
      <ProjectsSection
        sectionRef={projectsRef}
        isVisible={viewState.sectionVisibility.projects}
        projectsOpacity={viewState.projectsOpacity}
        indexProjects={indexProjects}
        router={router}
        spaceGrotesk={{ className: sgClass }}
      />
      <ContactSection
        sectionRef={contactRef}
        isVisible={viewState.sectionVisibility.contact}
        contactOpacity={viewState.contactOpacity}
        handleExternalLink={handleExternalLink}
        handleSocialLinkClick={handleSocialLinkClick}
      />
      <ContactModal
        isOpen={modal.contact}
        onClose={() => setModal(s => ({ ...s, contact: false }))}
        variant={modal.source === 'gmail' ? 'contact' : 'social'}
        hideDirectAccess={modal.source === 'gmail'}
      />
      {modal.external && (
        <ExternalLinkModal
          isOpen={modal.external}
          onClose={() => setModal(s => ({ ...s, external: false }))}
          targetUrl={modal.url}
        />
      )}
    </>
  );
}
