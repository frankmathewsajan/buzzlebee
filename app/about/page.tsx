"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import PortfolioMap from "../components/PortfolioMap";
import ContactModal from "../components/ContactModal";

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"] },
  { category: "Backend", items: ["Node.js", "Python", "FastAPI", "Express", "PostgreSQL"] },
  { category: "AI/ML", items: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Pandas"] },
  { category: "Mobile", items: ["React Native", "Flutter", "Cordova", "Android Studio"] },
  { category: "Cloud/DevOps", items: ["AWS", "Docker", "Firebase", "Vercel", "Git"] },
  { category: "Tools", items: ["VS Code", "Figma", "Postman", "MongoDB", "Linux"] },
];

const experiences = [
  {
    title: "Computer Science Engineering Student",
    organization: "VIT-AP University",
    period: "2022 - Present",
    description: "Pursuing B.Tech in Computer Science Engineering with specialization in AI/ML.",
  },
  {
    title: "Freelance Developer",
    organization: "Self-employed",
    period: "2023 - Present", 
    description: "Building web applications and mobile apps for small businesses and startups.",
  },
];

export default function AboutPage() {
  const [titleText, setTitleText] = useState("Chapter One: Introduction");
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const decodeSequence = [
      "Kapitel Eins: Einführung",
      "K@p1t3l E1ns: E1nführung",
      "Kap1tel 31ns: 31nführung", 
      "Chapt3l 0ne: 1ntroduct10n",
      "Chapt3r 0ne: 1ntr0duct10n",
      "Chapter 0ne: Introduct1on",
      "Chapter One: Introduction"
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
      }, 200);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-[#e7dfd8] min-h-screen">
      <PortfolioMap />

      {/* Navigation */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link 
          href="/" 
          className="text-gray-800 hover:text-gray-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <button
          onClick={() => setContactModalOpen(true)}
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Get In Touch
        </button>
      </motion.div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-caveat text-gray-800 mb-4 font-mono">
              {titleText}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A passionate developer crafting digital solutions that bridge creativity and functionality.
              Currently pursuing Computer Science Engineering while building real-world applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Profile */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="relative">
                <Image
                  src="/images/frank.jpg"
                  alt="Frank Mathew Sajan"
                  width={400}
                  height={500}
                  className="w-full max-w-md mx-auto lg:mx-0 rounded-2xl shadow-2xl"
                  priority
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800">About Me</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    I&apos;m Frank Mathew Sajan, a Computer Science Engineering student at VIT-AP University 
                    with a deep passion for technology and innovation. My journey in software development 
                    began over 5 years ago, and I&apos;ve been constantly learning and building ever since.
                  </p>
                  <p>
                    I specialize in full-stack development, AI/ML applications, and mobile app development. 
                    I love creating solutions that not only work efficiently but also provide exceptional 
                    user experiences.
                  </p>
                  <p>
                    When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open 
                    source projects, or working on personal projects that challenge my skills.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Skills & Experience */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Skills */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Technical Skills</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {skills.map((skillGroup) => (
                    <div key={skillGroup.category} className="bg-white/60 backdrop-blur-sm p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-3">{skillGroup.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Experience</h3>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm p-6 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">{exp.title}</h4>
                        <span className="text-sm text-gray-500">{exp.period}</span>
                      </div>
                      <p className="text-gray-600 font-medium mb-2">{exp.organization}</p>
                      <p className="text-gray-600 text-sm">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-gray-800">Ready to Work Together?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              I&apos;m always interested in new opportunities and exciting projects. 
              Let&apos;s discuss how we can bring your ideas to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setContactModalOpen(true)}
                className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg"
              >
                Get In Touch
              </button>
              <Link
                href="/projects"
                className="px-8 py-4 border-2 border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition-colors text-lg inline-block"
              >
                View My Work
              </Link>
            </div>
          </motion.div>
        </div>
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