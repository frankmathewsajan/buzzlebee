import { Space_Grotesk, Inter } from 'next/font/google';
import PortfolioMap from '@/app/components/PortfolioMap';
import ProjectsClient from '@/app/components/projects/ProjectsClient';
import projects from '../projects.json';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap' });
const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function Projects() {
  return (
    <div className="min-h-screen">
      <PortfolioMap />
      <ProjectsClient
        projects={projects}
        sgClass={spaceGrotesk.className}
        interClass={inter.className}
      />
    </div>
  );
} 