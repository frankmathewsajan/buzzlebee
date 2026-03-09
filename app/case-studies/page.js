import { Space_Grotesk, Inter } from 'next/font/google';
import PortfolioMap from '@/app/components/PortfolioMap';
import CaseStudyGrid from '@/app/components/case-studies/CaseStudyGrid';
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
      <div className="h-screen bg-[#FFEBD0] overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-8 py-8 flex relative">
          <div className="flex-1 flex flex-col">
            <div className="max-w-2xl mb-8 animate-entry-fade-up">
              <h1 className={`${spaceGrotesk.className} text-4xl md:text-6xl leading-none text-[#1A365D] mb-4`}>
                Case Studies
              </h1>
              <p className={`${inter.className} text-sm text-[#1A365D]/60 leading-relaxed font-light max-w-100 text-justify`}>
                Detailed technical case studies showcasing my solutions and their measurable impact across various domains.
              </p>
            </div>

            <CaseStudyGrid
              caseStudies={caseStudies}
              spaceGroteskClass={spaceGrotesk.className}
              interClass={inter.className}
            />
          </div>
        </div>
      </div>
    </>
  );
}