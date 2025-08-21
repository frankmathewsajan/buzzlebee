"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Space_Grotesk, Inter } from "next/font/google";
import { FaGithub, FaLinkedin, FaDiscord, FaInstagram } from "react-icons/fa";
import Image from "next/image";

import PortfolioMap from "./components/PortfolioMap";
import DevNotice from "./components/DevNotice";
import ContactModal from "./components/ContactModal";
import ExternalLinkModal from "./components/ExternalLinkModal";
import ProjectCard from "./components/ProjectCard";
import projectsData from "./projects.json";
import type { Project, ContactModalVariant } from "../types";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });

interface ViewState {
  sectionVisibility: Record<string, boolean>;
  projectsOpacity: number;
  contactOpacity: number;
}

export default function Home() {
  const router = useRouter();
  const indexProjects = useMemo(
    () => projectsData.filter((project: any) => project.SHOW_IN_INDEX),
    []
  );

  const [viewState, setViewState] = useState<ViewState>({
    sectionVisibility: { home: true, about: false, projects: false, contact: false },
    projectsOpacity: 0,
    contactOpacity: 0,
  });

  const [contactModal, setContactModal] = useState({
    isOpen: false,
    variant: "social" as ContactModalVariant,
  });

  const [externalLinkModal, setExternalLinkModal] = useState({
    isOpen: false,
    url: "",
  });

  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sectionRefs = useMemo(
    () => ({
      home: homeRef,
      about: aboutRef,
      projects: projectsRef,
      contact: contactRef,
    }),
    [homeRef, aboutRef, projectsRef, contactRef]
  );

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const aboutSection = document.getElementById("about");
    const contactSection = document.getElementById("contact");

    if (!aboutSection || !contactSection) return;

    const aboutMiddle = aboutSection.offsetTop + aboutSection.offsetHeight / 2;
    const contactTrigger = contactSection.offsetTop - windowHeight * 0.75;

    const newProjectsOpacity = scrollY >= aboutMiddle && scrollY < contactTrigger ? 1 : 0;
    const newContactOpacity = scrollY >= contactTrigger ? 1 : 0;

    setViewState((prev) => {
      if (prev.projectsOpacity !== newProjectsOpacity || prev.contactOpacity !== newContactOpacity) {
        return { ...prev, projectsOpacity: newProjectsOpacity, contactOpacity: newContactOpacity };
      }
      return prev;
    });
  }, []);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const updates: Record<string, boolean> = {};
    entries.forEach((entry) => {
      updates[entry.target.id] = entry.intersectionRatio >= 0.5;
    });

    setViewState((prev) => ({
      ...prev,
      sectionVisibility: { ...prev.sectionVisibility, ...updates },
    }));
  }, []);

  const handleSocialClick = useCallback((platform: string, url: string) => {
    if (["instagram", "discord", "github", "gmail"].includes(platform)) {
      setContactModal({
        isOpen: true,
        variant: platform === "gmail" ? "gmail" : "social",
      });
    } else {
      window.open(url, "_blank");
    }
  }, []);

  const handleExternalLink = useCallback((url: string) => {
    setExternalLinkModal({ isOpen: true, url });
  }, []);

  // Scroll handler setup
  useEffect(() => {
    let timeoutId: number | null = null;
    const throttledScroll = () => {
      if (timeoutId) return;
      timeoutId = requestAnimationFrame(() => {
        handleScroll();
        timeoutId = null;
      });
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (timeoutId) cancelAnimationFrame(timeoutId);
    };
  }, [handleScroll]);

  // Intersection observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.5],
      rootMargin: "0px",
    });

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [handleIntersection, sectionRefs]);

  // Scroll position persistence
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("indexScrollPosition", window.scrollY.toString());
    };

    const restoreScrollPosition = () => {
      const savedPosition = localStorage.getItem("indexScrollPosition");
      if (savedPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition));
          localStorage.removeItem("indexScrollPosition");
        }, 100);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    restoreScrollPosition();

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <div className="min-h-screen bg-[#e7dfd8]">
      <DevNotice />
      <PortfolioMap />

      {/* Hero Section */}
      <section
        id="home"
        ref={sectionRefs.home}
        className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-1000 ease-in-out ${
          viewState.sectionVisibility.home ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-left space-y-12 ml-8">
              <div className="relative">
                <h1 className="text-[4rem] md:text-[6rem] text-gray-800 font-caveat leading-[1.1] hover:scale-105 transition-transform cursor-default">
                  Just
                </h1>
                <div className="text-[5rem] md:text-[7rem] font-caveat text-gray-800 hover:scale-105 transition-transform cursor-default leading-[1.1]">
                  Frank
                </div>
                <p className="text-lg md:text-xl text-gray-600 mt-12 font-serif italic max-w-xl opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.4s_forwards] leading-relaxed tracking-wide">
                  Shaping ideas that transcend time
                  <br />
                  <span className="ml-4 inline-block">—one bug at a time.</span>
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-6 mt-16 max-w-xl opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.6s_forwards]">
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl">
                    <div className="text-3xl font-caveat text-gray-800 mb-1">5+</div>
                    <div className="text-sm font-outfit text-gray-600">Years of Coding</div>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl">
                    <div className="text-3xl font-caveat text-gray-800 mb-1">10+</div>
                    <div className="text-sm font-outfit text-gray-600">AI/ML & Software Projects</div>
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl">
                    <div className="text-3xl font-caveat text-gray-800 mb-1">3+</div>
                    <div className="text-sm font-outfit text-gray-600">Years of Academic Research</div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 mt-8 opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.8s_forwards]">
                  {[
                    { icon: FaGithub, platform: "github", url: "https://github.com/frankmathewsajan" },
                    { icon: FaLinkedin, platform: "linkedin", url: "https://linkedin.com/in/frankmathewsajan" },
                    { icon: FaDiscord, platform: "discord", url: "#" },
                    { icon: FaInstagram, platform: "instagram", url: "#" },
                  ].map(({ icon: Icon, platform, url }) => (
                    <button
                      key={platform}
                      onClick={() => handleSocialClick(platform, url)}
                      className="p-3 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 group"
                    >
                      <Icon className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center relative">
              <div className="relative opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]">
                <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white/50 backdrop-blur-sm shadow-2xl hover:scale-105 transition-all duration-500">
                  <Image
                    src="/images/frank-main.png"
                    alt="Frank Mathew Sajan"
                    width={384}
                    height={384}
                    className="w-full h-full object-cover object-center"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-green-500 w-8 h-8 rounded-full border-4 border-white animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={sectionRefs.about}
        className={`min-h-screen flex items-center justify-center relative py-20 transition-all duration-1000 ease-in-out ${
          viewState.sectionVisibility.about ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-caveat text-gray-800 mb-6 ${spaceGrotesk.className}`}>
              About Me
            </h2>
            <div className="w-24 h-1 bg-gray-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                I&apos;m a Computer Science Engineering student with a passion for creating innovative solutions
                that bridge the gap between technology and real-world problems.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                My journey spans across AI/ML, full-stack development, and IoT systems, with experience
                in everything from neural networks to embedded systems.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => router.push("/about")}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Learn More
                </button>
                <button
                  onClick={() => router.push("/resume")}
                  className="px-6 py-3 border-2 border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
                >
                  View Resume
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { title: "Full-Stack Development", desc: "React, Next.js, Node.js, Python" },
                { title: "AI/ML", desc: "TensorFlow, PyTorch, Scikit-learn" },
                { title: "Mobile Development", desc: "React Native, Flutter, Cordova" },
                { title: "Cloud & DevOps", desc: "AWS, Docker, Firebase" },
              ].map((skill) => (
                <div key={skill.title} className="bg-white/40 backdrop-blur-sm p-6 rounded-xl">
                  <h4 className="text-lg font-medium text-gray-800 mb-2">{skill.title}</h4>
                  <p className="text-sm text-gray-600">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen py-20 relative"
        style={{ opacity: viewState.projectsOpacity }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-caveat text-gray-800 mb-6 ${spaceGrotesk.className}`}>
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gray-400 mx-auto"></div>
          </div>

          <div className="space-y-12">
            {indexProjects.map((project: any) => (
              <ProjectCard key={project.id} project={project} router={router} spaceGrotesk={spaceGrotesk} />
            ))}
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => router.push("/projects")}
              className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg"
            >
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen py-20 relative"
        style={{ opacity: viewState.contactOpacity }}
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className={`text-5xl md:text-6xl font-caveat text-gray-800 mb-8 ${spaceGrotesk.className}`}>
            Let&apos;s Connect
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Whether you want to discuss a project, share ideas, or just say hello, I&apos;d love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setContactModal({ isOpen: true, variant: "contact" })}
              className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg"
            >
              Get In Touch
            </button>
            <button
              onClick={() => handleExternalLink("mailto:frankmathewsajan@gmail.com")}
              className="px-8 py-4 border-2 border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition-colors text-lg"
            >
              Send Email
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ContactModal
        isOpen={contactModal.isOpen}
        onClose={() => setContactModal({ isOpen: false, variant: "social" })}
        variant={contactModal.variant}
      />
      <ExternalLinkModal
        isOpen={externalLinkModal.isOpen}
        onClose={() => setExternalLinkModal({ isOpen: false, url: "" })}
        targetUrl={externalLinkModal.url}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
