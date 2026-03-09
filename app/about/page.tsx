import Image from "next/image";
import PortfolioMap from "@/app/components/PortfolioMap";
import AnimatedTitle from "@/app/components/about/AnimatedTitle";
import ScrollReveal from "@/app/components/about/ScrollReveal";
import FloatingNav from "@/app/components/about/FloatingNav";
import ContactCTA from "@/app/components/about/ContactCTA";

const HL = ({ children }: { children: React.ReactNode }) => (
  <span className="text-gray-900 underline decoration-1 underline-offset-2">{children}</span>
);
const B = ({ children }: { children: React.ReactNode }) => (
  <span className="text-gray-900">{children}</span>
);
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
                <P>
                  I&apos;m <B>Frank Mathew Sajan</B>, originally from <B>Kerala</B> but
                  currently studying in <B>Andhra Pradesh</B>. I spend my time <B>coding</B>,{" "}
                  <B>learning German</B>, and occasionally playing chess or watching anime.
                </P>
                <P className="mb-8">
                  I build software that works across platforms:{" "}
                  <B>web apps, mobile apps, and desktop applications </B>
                  that solve real problems. My work spans from{" "}
                  <B>system architecture to research projects</B> depending on the challenge,
                  with some <B>freelance work</B> when interesting opportunities arise.
                </P>
              </div>
              <div className="flex flex-wrap gap-4 text-base text-gray-600 font-serif italic">
                <span>Engineer</span><span>•</span>
                <span>Freelancer</span><span>•</span>
                <span>Researcher</span><span>•</span>
                <span className="relative group cursor-help whitespace-nowrap" title="Learning German">
                  <span className="group-hover:opacity-0 transition-opacity duration-300">Deutsch lernen</span>
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
            <h2 className="text-3xl font-serif font-normal text-gray-900 mb-3 text-center">Chapter 2: Education</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-serif italic text-center">
              &ldquo;The journey of learning never truly begins in classrooms. It starts with curiosity.&rdquo;
            </p>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto prose prose-lg">
            <ScrollReveal>
              <P className="first-letter:text-6xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1">
                My educational journey began like most others, with small steps in <HL>primary school</HL>,
                learning to read and write, discovering numbers and their relationships. Those early years
                at various institutions laid a foundation I didn&apos;t fully appreciate at the time. During
                my time at <HL>St. Joseph&apos;s HSS</HL>, I became a <HL>Rajya Puraskar Scout</HL> and was
                awarded <HL>Nanammudra in the Chief Minister&apos;s Shield competition</HL>, experiences that
                taught me <B>leadership, teamwork, and service to community</B>.
              </P>
            </ScrollReveal>
            <ScrollReveal>
              <P>
                The transition to <HL>St. Joseph&apos;s Higher Secondary School</HL> marked a turning point.
                Here, <HL>mathematics</HL> began to make sense not just as abstract formulas, but as a language
                that could describe the world around me. It was during these years that I first encountered
                a <HL>computer</HL>, and something clicked.
              </P>
            </ScrollReveal>
            <ScrollReveal>
              <P>
                <HL>VIT-AP University, Amaravati</HL> became the next chapter. Moving from Kerala to Andhra
                Pradesh wasn&apos;t just a geographic shift but was stepping into independence.
                The <HL>Bachelors in Computer Science and Engineering</HL>&nbsp;program here isn&apos;t just
                about learning programming languages; it&apos;s about learning to <B>think systematically,
                to break down complex problems, and to build solutions</B> that matter.
              </P>
            </ScrollReveal>
            <ScrollReveal>
              <P>
                But perhaps the most important education has happened outside formal
                curricula. <HL>Learning German</HL>&nbsp;on my own, diving into <HL>research projects</HL> that
                fascinate me, discovering that the best learning happens when <B>curiosity drives the journey</B>.
              </P>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 px-8 bg-[#f8f6f3]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="mb-12">
            <h2 className="text-3xl font-serif font-normal text-gray-900 mb-3 text-center">Chapter 3: Experience</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-serif italic text-center">
              &ldquo;Experience is not what happens to you; it&apos;s what you do with what happens to you.&rdquo;
            </p>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto prose prose-lg">
            <ScrollReveal>
              <P className="first-letter:text-6xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1">
                My first real taste of the professional world came through
                the <HL>Innovation, Incubation, and Entrepreneurship Center (IIEC)</HL>&nbsp;at <HL>VIT-AP
                University</HL>, where I work as a <HL>Research and Development Software Engineer</HL>. Under
                the guidance of&nbsp;<HL>Dr. Santanu Mandal Ph.D</HL>, I&apos;ve been involved in
                developing <B>innovative software solutions</B> that bridge academic research with practical
                applications.
              </P>
            </ScrollReveal>
            <ScrollReveal>
              <P>
                But experience isn&apos;t just about prestigious programs. It&apos;s built in the quiet hours
                spent debugging code that refuses to work, in the satisfaction of finally solving a problem
                that seemed impossible yesterday. My internship at <HL>TechtoGreen Drone &amp; Robotics Pvt
                Ltd</HL> expanded my horizons into the world of <HL>autonomous systems and robotics</HL>,
                where software meets hardware in fascinating ways.
              </P>
            </ScrollReveal>
            <ScrollReveal>
              <P>
                Leadership opportunities have also shaped my journey significantly.
                As <HL>Deputy Captain</HL> of the&nbsp;<HL>Institution of Electronics and Telecommunication
                Engineers (IETE)</HL> student chapter on campus, I&apos;ve learned that effective leadership
                isn&apos;t about having all the answers but is about asking the right questions and creating
                space for others to contribute their best work.
              </P>
            </ScrollReveal>
            <ScrollReveal>
              <P>
                I&apos;ve learned that <HL>full-stack development</HL> is less about mastering every framework
                and more about understanding how to connect ideas to implementation. Whether it&apos;s
                a <HL>React frontend</HL>&nbsp;that users love interacting with, or
                a <HL>Node.js/Django backend</HL> that handles thousands of requests without breaking, each
                project teaches something new.
              </P>
            </ScrollReveal>
            <ScrollReveal>
              <P>
                Some of my most valuable experience comes from <HL>research projects</HL>: those moments when
                you&apos;re exploring questions that don&apos;t have Stack Overflow answers. These projects
                teach <B>patience, systematic thinking, and the humility</B> that comes with realizing how
                much you don&apos;t know.
              </P>
            </ScrollReveal>
            <ScrollReveal>
              <P>
                The most rewarding experiences have been those where everyone grows together. Whether
                it&apos;s collaborating on <HL>research projects at IIEC</HL>, organizing <HL>technical events
                through IETE</HL>, or working with teams on <B>complex software solutions</B>, the best
                outcomes emerge when diverse perspectives combine toward a common goal.
              </P>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
}
