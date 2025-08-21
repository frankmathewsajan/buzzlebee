"use client";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { NextFont } from "next/dist/compiled/@next/font";
import type { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  router: AppRouterInstance;
  spaceGrotesk: NextFont;
}

const Badge = ({ type, url, project }: { type: string; url: string; project: Project }) => {
  const badgeConfig = {
    AWARDED: {
      bg: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
      icon: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z",
      tooltip: "View award details →",
    },
    CERTIFIED: {
      bg: "bg-blue-100 text-blue-700 hover:bg-blue-200",
      icon: "M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
      tooltip: "View certification →",
    },
    DEPLOYED: {
      bg: "bg-green-100 text-green-700 hover:bg-green-200",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      tooltip: `Visit live ${project.id === 'monopoly-banking' ? 'app' : 'site'} →`,
    },
  };

  const config = badgeConfig[type as keyof typeof badgeConfig];
  if (!config) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === "DEPLOYED") {
      window.open(url, "_blank");
    } else {
      // Handle other badge types (navigate to internal pages)
      window.location.href = url;
    }
  };

  return (
    <div className="relative group/badge">
      <div
        className={`flex items-center gap-1 ${config.bg} px-2 py-1 rounded-full text-xs font-mono cursor-pointer transition-colors`}
        onClick={handleClick}
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d={config.icon} />
        </svg>
        {type}
      </div>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 text-white text-xs rounded-lg opacity-0 group-hover/badge:opacity-100 transition-all duration-200 whitespace-nowrap z-10 pointer-events-none">
        {config.tooltip}
      </div>
    </div>
  );
};

export default function ProjectCard({ project, router, spaceGrotesk }: ProjectCardProps) {
  const handleClick = () => router.push(`/projects#${project.id}`);

  const getProjectDescription = () => {
    const descriptions: Record<string, string> = {
      "monopoly-banking": "Gamified banking system inspired by Monopoly's Ultimate Banking, featuring real-time balance updates and comprehensive transaction management.",
      "library-management": "Comprehensive GUI-based system handling library operations with inventory management, member tracking, and automated fine calculations.",
    };
    return descriptions[project.id] || project.description;
  };

  const getProjectTitle = () => {
    if (project.id === "monopoly-banking") {
      return "MONOPOLY DIGITAL BANKING SIMULATION";
    }
    return project.title.replace(/System/g, "SYSTEM").replace(/Platform/g, "PLATFORM").toUpperCase();
  };

  return (
    <div className="group cursor-pointer" onClick={handleClick}>
      {/* Divider Line */}
      <div className="w-full h-px bg-gray-300 mb-6"></div>

      {/* Project Info */}
      <div className="space-y-5 mb-8">
        {/* Project Name & Tech Stack */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3
              className={`text-sm lg:text-base font-mono text-gray-900 group-hover:text-red-600 transition-colors uppercase tracking-wider leading-tight ${
                project.id === "monopoly-banking" ? "mb-2" : ""
              } ${spaceGrotesk.className}`}
            >
              {getProjectTitle()}
            </h3>
            <div className="flex items-center gap-2">
              {project.badges?.AWARDED && <Badge type="AWARDED" url={project.badges.AWARDED} project={project} />}
              {project.badges?.CERTIFIED && <Badge type="CERTIFIED" url={project.badges.CERTIFIED} project={project} />}
              {project.badges?.DEPLOYED && <Badge type="DEPLOYED" url={project.badges.DEPLOYED} project={project} />}
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded font-mono">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Project Description */}
        <div>
          <p className="text-gray-600 text-sm leading-relaxed font-mono">{getProjectDescription()}</p>
          <span className="text-xs text-gray-400 font-mono mt-2 block">
            {project.timeline.split(" - ")[0] || project.timeline}
          </span>
        </div>
      </div>

      {/* Read More Button */}
      <div className="mt-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/projects#${project.id}`);
          }}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-mono group/button"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover/button:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          Read more
        </button>
      </div>
    </div>
  );
}
