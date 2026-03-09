import { Space_Grotesk, Inter } from 'next/font/google';
import Link from 'next/link';
import { FaLink } from 'react-icons/fa';
import PortfolioMap from '@/app/components/PortfolioMap';
import { SITE_LINKS } from '@/data/navigation/site-links';

// Font setup
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#FAF5EE] via-[#F8F2E9] to-[#FAF5EE] px-4">
      {/* Portfolio Explorer Map */}
      <PortfolioMap />
      
      <div className="text-center space-y-8 animate-entry-fade-up">
        <h1 className={`${spaceGrotesk.className} text-8xl md:text-9xl text-[#5D503A]`}>
          404
        </h1>
        <div className="space-y-4">
          <h2 className={`${spaceGrotesk.className} text-2xl md:text-3xl text-[#5D503A]`}>
            Page Not Found
          </h2>
          <p className={`${inter.className} text-[#5D503A]/60 max-w-md mx-auto`}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className={`${spaceGrotesk.className} text-sm uppercase tracking-wider text-[#5D503A]`}>
            Site Map
          </h3>
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {SITE_LINKS.map((page) => (
              page.external ? (
                <a
                  key={page.name}
                  href={page.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${inter.className} px-4 py-2 rounded-full border border-[#5D503A]/20 hover:border-[#5D503A] text-[#5D503A] hover:text-[#5D503A]/80 transition-all duration-200 text-center text-sm flex items-center justify-center gap-1`}
                >
                  {page.name}
                  <FaLink className="w-3 h-3" />
                </a>
              ) : (
                <Link
                  key={page.name}
                  href={page.href}
                  className={`${inter.className} px-4 py-2 rounded-full border border-[#5D503A]/20 hover:border-[#5D503A] text-[#5D503A] hover:text-[#5D503A]/80 transition-all duration-200 text-center text-sm`}
                >
                  {page.name}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}