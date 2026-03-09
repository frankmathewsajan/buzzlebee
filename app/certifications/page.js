import { Space_Grotesk, Inter } from 'next/font/google';
import PortfolioMap from '@/app/components/PortfolioMap';
import CertificationsClient from '@/app/components/certifications/CertificationsClient';
import certifications from '@/data/routes/certifications/certifications.json';

export const metadata = {
  title: 'Certifications | Frank Mathew Sajan',
  description: 'Verified certifications, achievements, and credentials.',
};

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap' });
const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function Certifications() {
  return (
    <div className="min-h-screen">
      <PortfolioMap />
      <CertificationsClient
        certifications={certifications}
        spaceGroteskClass={spaceGrotesk.className}
        interClass={inter.className}
      />
    </div>
  );
} 