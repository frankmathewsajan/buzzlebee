import { Space_Grotesk, Inter } from 'next/font/google';
import PortfolioMap from '@/app/components/PortfolioMap';
import CaseStudiesClient from '@/app/components/case-studies/CaseStudiesClient';
import projectsData from '@/data/routes/projects/projects.json';

// Font setup
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Case Studies | Frank Mathew Sajan',
  description: 'Technical case studies with context, approach, and outcomes.',
};

// Get only projects with case studies that are visible
const caseStudies = projectsData.filter(p => p.has_case_study && !p.case_study_hidden);

export default function CaseStudies() {
  return (
    <>
      <PortfolioMap />
      <CaseStudiesClient
        caseStudies={caseStudies}
        spaceGroteskClass={spaceGrotesk.className}
        interClass={inter.className}
      />
    </>
  );
}