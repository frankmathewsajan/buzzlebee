"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import PortfolioMap from "../components/PortfolioMap";
import ContactModal from "../components/ContactModal";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [titleText, setTitleText] = useState("Kapitel Eins: Einführung");
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const decodeSequence = [
      "Kapitel Eins: Einführung",
      "K@p1t3l E1ns: E1nführung",
      "Kap1tel 31ns: 31nführung",
      "Chapt3l 0ne: 1ntroduct10n",
      "Chapt3r 0ne: 1ntr0duct10n",
      "Chap7er On3: Intr0ducti0n",
      "Chapter 0ne: Introduct1on",
      "Chapter On3: Introduction",
      "Chapter One: Intro@uction",
      "Chapter One: Introduction",
    ];

    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < decodeSequence.length - 1) {
          index++;
          setTitleText(decodeSequence[index]);
        } else {
          clearInterval(interval);
        }
      }, 200); // 200ms between each step = 2s total
    }, 1500); // Start after 1.5s

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="relative bg-[#e7dfd8] min-h-screen">
      {/* Portfolio Map Component */}
      <PortfolioMap />

      {/* Navigation */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/">
          <motion.button
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-gray-200/50 text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="text-sm font-medium">Home</span>
          </motion.button>
        </Link>

        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-gray-200/50 text-gray-700 hover:text-gray-900 transition-all duration-300 shadow-sm hover:shadow-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: showScrollTop ? 1 : 0,
            scale: showScrollTop ? 1 : 0.8,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      </motion.div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <motion.div className="absolute inset-0 opacity-30" style={{ opacity }}>
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Name and Title - Centered */}
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-5xl font-serif font-light bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-8 px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {titleText}
            </motion.h1>
          </div>

          {/* Content with Image */}
          <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto">
            {/* Image */}
            <motion.div
              className="flex-shrink-0 mx-auto lg:mx-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 3.8 }}
            >
              <div className="relative w-64 h-96 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/images/frank-main.png"
                  alt="Frank Mathew Sajan"
                  fill
                  className="object-cover grayscale contrast-110 brightness-95 hover:grayscale-0 transition-all duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              className="flex-1 min-w-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 4.0 }}
            >
              <div className="prose prose-xl max-w-none">
                <p className="text-xl font-serif leading-9 mb-6 text-gray-800 text-justify">
                  I&apos;m{" "}
                  <span className="text-gray-900">Frank Mathew Sajan</span>,
                  originally from <span className="text-gray-900">Kerala</span>{" "}
                  but currently studying in{" "}
                  <span className="text-gray-900">Andhra Pradesh</span>. I spend
                  my time <span className="text-gray-900">coding</span>,{" "}
                  <span className="text-gray-900">learning German</span>, and
                  occasionally playing chess or watching anime.
                </p>
                <p className="text-xl font-serif leading-9 mb-8 text-gray-800 text-justify">
                  I build software that works across platforms:{" "}
                  <span className="text-gray-900">
                    web apps, mobile apps, and desktop applications{" "}
                  </span>
                  that solve real problems. My work spans from{" "}
                  <span className="text-gray-900">
                    system architecture to research projects
                  </span>{" "}
                  depending on the challenge, with some{" "}
                  <span className="text-gray-900">freelance work</span> when
                  interesting opportunities arise.
                </p>
              </div>

              <motion.div
                className="flex flex-wrap gap-4 text-base text-gray-600 font-serif italic"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                transition={{ delay: 4.4 }}
              >
                <motion.span variants={fadeInUp}>Engineer</motion.span>
                <motion.span variants={fadeInUp}>•</motion.span>
                <motion.span variants={fadeInUp}>Freelancer</motion.span>
                <motion.span variants={fadeInUp}>•</motion.span>
                <motion.span variants={fadeInUp}>Researcher</motion.span>
                <motion.span variants={fadeInUp}>•</motion.span>
                <motion.span
                  variants={fadeInUp}
                  className="relative group cursor-help whitespace-nowrap"
                  title="Learning German"
                >
                  <span className="group-hover:opacity-0 transition-opacity duration-300">
                    Deutsch lernen
                  </span>
                  <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-800 whitespace-nowrap">
                    Learning German
                  </span>
                </motion.span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-serif font-normal text-gray-900 mb-3 text-center">
              Chapter 2: Education
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-serif italic text-center">
              &ldquo;The journey of learning never truly begins in classrooms.
              It starts with curiosity.&rdquo;
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Chapter Content */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="prose prose-lg max-w-none">
                <motion.p
                  variants={fadeInUp}
                  className="text-xl font-serif leading-9 mb-6 text-gray-800 text-justify first-letter:text-6xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1"
                >
                  My educational journey began like most others, with small
                  steps in{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    primary school
                  </span>
                  , learning to read and write, discovering numbers and their
                  relationships. Those early years at various institutions laid
                  a foundation I didn&apos;t fully appreciate at the time.
                  During my time at{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    St. Joseph&apos;s HSS
                  </span>
                  , I became a{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    Rajya Puraskar Scout
                  </span>{" "}
                  and was awarded{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    Nanammudra in the Chief Minister&apos;s Shield competition
                  </span>
                  , experiences that taught me{" "}
                  <span className="text-gray-900">
                    leadership, teamwork, and service to community
                  </span>
                  .
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl font-serif leading-9 mb-6 text-gray-800 text-justify"
                >
                  The transition to{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    St. Joseph&apos;s Higher Secondary School
                  </span>{" "}
                  marked a turning point. Here,{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    mathematics
                  </span>{" "}
                  began to make sense not just as abstract formulas, but as a
                  language that could describe the world around me. It was
                  during these years that I first encountered a{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    computer
                  </span>
                  , and something clicked.
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl font-serif leading-9 mb-6 text-gray-800 text-justify"
                >
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    VIT-AP University, Amaravati
                  </span>{" "}
                  became the next chapter. Moving from Kerala to Andhra Pradesh
                  wasn&apos;t just a geographic shift but was stepping into
                  independence. The{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    Bachelors in Computer Science and Engineering
                  </span>
                  &nbsp;program here isn&apos;t just about learning programming
                  languages; it&apos;s about learning to{" "}
                  <span className="text-gray-900">
                    think systematically, to break down complex problems, and to
                    build solutions
                  </span>{" "}
                  that matter.
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl font-serif leading-9 text-gray-800 text-justify"
                >
                  But perhaps the most important education has happened outside
                  formal curricula.{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    Learning German
                  </span>
                  &nbsp;on my own, diving into{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    research projects
                  </span>{" "}
                  that fascinate me, discovering that the best learning happens
                  when{" "}
                  <span className="text-gray-900">
                    curiosity drives the journey
                  </span>
                  .
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-8 bg-[#f8f6f3]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-serif font-normal text-gray-900 mb-3 text-center">
              Chapter 3: Experience
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-serif italic text-center">
              &ldquo;Experience is not what happens to you; it&apos;s what you
              do with what happens to you.&rdquo;
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Chapter Content */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="prose prose-lg max-w-none">
                <motion.p
                  variants={fadeInUp}
                  className="text-xl font-serif leading-9 mb-6 text-gray-800 text-justify first-letter:text-6xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1"
                >
                  My first real taste of the professional world came through the{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    Innovation, Incubation, and Entrepreneurship Center (IIEC)
                  </span>
                  &nbsp;at{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    VIT-AP University
                  </span>
                  , where I work as a{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    Research and Development Software Engineer
                  </span>
                  . Under the guidance of&nbsp;
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    Dr. Santanu Mandal Ph.D
                  </span>
                  , I&apos;ve been involved in developing{" "}
                  <span className="text-gray-900">
                    innovative software solutions
                  </span>{" "}
                  that bridge academic research with practical applications.
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl font-serif leading-9 mb-6 text-gray-800 text-justify"
                >
                  But experience isn&apos;t just about prestigious programs.
                  It&apos;s built in the quiet hours spent debugging code that
                  refuses to work, in the satisfaction of finally solving a
                  problem that seemed impossible yesterday. My internship at{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    TechtoGreen Drone & Robotics Pvt Ltd
                  </span>{" "}
                  expanded my horizons into the world of{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    autonomous systems and robotics
                  </span>
                  , where software meets hardware in fascinating ways.
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl font-serif leading-9 mb-6 text-gray-800 text-justify"
                >
                  Leadership opportunities have also shaped my journey
                  significantly. As{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    Deputy Captain
                  </span>{" "}
                  of the&nbsp;
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    Institution of Electronics and Telecommunication Engineers
                    (IETE)
                  </span>{" "}
                  student chapter on campus, I&apos;ve learned that effective
                  leadership isn&apos;t about having all the answers but is
                  about asking the right questions and creating space for others
                  to contribute their best work.
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl font-serif leading-9 mb-6 text-gray-800 text-justify"
                >
                  I&apos;ve learned that{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    full-stack development
                  </span>{" "}
                  is less about mastering every framework and more about
                  understanding how to connect ideas to implementation. Whether
                  it&apos;s a{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    React frontend
                  </span>
                  &nbsp;that users love interacting with, or a{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    Node.js/Django backend
                  </span>{" "}
                  that handles thousands of requests without breaking, each
                  project teaches something new.
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl font-serif leading-9 mb-6 text-gray-800 text-justify"
                >
                  Some of my most valuable experience comes from{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    research projects
                  </span>
                  : those moments when you&apos;re exploring questions that
                  don&apos;t have Stack Overflow answers. These projects teach{" "}
                  <span className="text-gray-900">
                    patience, systematic thinking, and the humility
                  </span>{" "}
                  that comes with realizing how much you don&apos;t know.
                </motion.p>

                <motion.p
                  variants={fadeInUp}
                  className="text-xl font-serif leading-9 text-gray-800 text-justify"
                >
                  The most rewarding experiences have been those where everyone
                  grows together. Whether it&apos;s collaborating on{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    research projects at IIEC
                  </span>
                  , organizing{" "}
                  <span className="text-gray-900 underline decoration-1 underline-offset-2">
                    technical events through IETE
                  </span>
                  , or working with teams on{" "}
                  <span className="text-gray-900">
                    complex software solutions
                  </span>
                  , the best outcomes emerge when diverse perspectives combine
                  toward a common goal.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-8 bg-gray-900">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-serif font-normal text-white mb-4">
            Epilogue
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-serif leading-7">
            This story is still being written. Each project, each collaboration,
            each challenge adds new chapters to a narrative that continues to
            evolve. If you&apos;d like to be part of the next chapter, I&apos;d
            love to hear from you.
          </p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Link href="/projects">
              <motion.button
                variants={fadeInUp}
                className="px-6 py-3 bg-white text-gray-900 rounded-md font-serif font-medium hover:bg-gray-100 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View My Work
              </motion.button>
            </Link>
            <motion.button
              variants={fadeInUp}
              className="px-6 py-3 border border-white text-white rounded-md font-serif font-medium hover:bg-white hover:text-gray-900 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setContactModalOpen(true)}
            >
              Start a Conversation
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        variant="contact"
      />
    </div>
  );
}
