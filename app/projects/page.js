import { Space_Grotesk, Inter } from 'next/font/google';
import PortfolioMap from '@/app/components/PortfolioMap';
import ProjectsClient from '@/app/components/projects/ProjectsClient';
import projects from '@/data/routes/projects/projects.json';
import miniProjects from '@/data/routes/projects/mini-projects.json';

export const metadata = {
  title: 'Projects | Frank Mathew Sajan',
  description: 'Project archive with technical details, outcomes, and links.',
};

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap' });
const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function Projects() {
  return (
    <div className="min-h-screen">
      <PortfolioMap />
      <ProjectsClient
        projects={projects}
        miniProjects={miniProjects}
        sgClass={spaceGrotesk.className}
        interClass={inter.className}
      />
    </div>
  );
} 