import Image from "next/image";
import PortfolioMap from "@/app/components/PortfolioMap";
import AnimatedTitle from "@/app/components/about/AnimatedTitle";
import ScrollReveal from "@/app/components/about/ScrollReveal";
import FloatingNav from "@/app/components/about/FloatingNav";
import ContactCTA from "@/app/components/about/ContactCTA";
import aboutContent from '@/data/content/about/about-content.json';

const P = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-xl font-serif leading-9 mb-6 text-gray-800 text-justify ${className}`}>{children}</p>
);

export default function AboutPage() {
  return (
    <div className="relative bg-[#e7dfd8] min-h-screen">
      <PortfolioMap />
      <FloatingNav />

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
        </div>

        <ScrollReveal className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <AnimatedTitle />
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto">
            <ScrollReveal delay={3.8} className="shrink-0 mx-auto lg:mx-0">
              <div className="relative w-64 h-96 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/frank-main.png"
                  alt="Frank Mathew Sajan"
                  fill
                  className="object-cover grayscale contrast-110 brightness-95 hover:grayscale-0 transition-all duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={4.0} className="flex-1 min-w-0">
              <div className="prose prose-xl max-w-none">
                {aboutContent.hero.paragraphs.map((paragraph, index) => (
                  <P key={paragraph} className={index === aboutContent.hero.paragraphs.length - 1 ? 'mb-8' : ''}>
                    {paragraph}
                  </P>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-base text-gray-600 font-serif italic">
                <span>{aboutContent.hero.roles[0]}</span><span>•</span>
                <span>{aboutContent.hero.roles[1]}</span><span>•</span>
                <span>{aboutContent.hero.roles[2]}</span><span>•</span>
                <span className="relative group cursor-help whitespace-nowrap" title="Learning German">
                  <span className="group-hover:opacity-0 transition-opacity duration-300">{aboutContent.hero.roles[3]}</span>
                  <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-800 whitespace-nowrap">Learning German</span>
                </span>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </section>

      {/* Education */}
      <section className="py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-12">
            <h2 className="text-3xl font-serif font-normal text-gray-900 mb-3 text-center">{aboutContent.education.title}</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-serif italic text-center">
              &ldquo;{aboutContent.education.quote}&rdquo;
            </p>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto prose prose-lg">
            {aboutContent.education.paragraphs.map((paragraph, index) => (
              <ScrollReveal key={paragraph}>
                <P className={index === 0 ? 'first-letter:text-6xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1' : ''}>
                  {paragraph}
                </P>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 px-8 bg-[#f8f6f3]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-12">
            <h2 className="text-3xl font-serif font-normal text-gray-900 mb-3 text-center">{aboutContent.experience.title}</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-serif italic text-center">
              &ldquo;{aboutContent.experience.quote}&rdquo;
            </p>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto prose prose-lg">
            {aboutContent.experience.paragraphs.map((paragraph, index) => (
              <ScrollReveal key={paragraph}>
                <P className={index === 0 ? 'first-letter:text-6xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1' : ''}>
                  {paragraph}
                </P>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
