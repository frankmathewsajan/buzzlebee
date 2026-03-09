import { Space_Grotesk } from 'next/font/google';
import HomeClient from '@/app/components/home/HomeClient';
import projectsData from './projects.json';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap' });

export default function Home() {
  const indexProjects = projectsData.filter(p => p.SHOW_IN_INDEX);

  return (
    <div className="min-h-screen bg-[#e7dfd8]">
      <HomeClient indexProjects={indexProjects} sgClass={spaceGrotesk.className} />
    </div>
  );
}
