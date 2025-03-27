'use client';

import Navbar from "../components/Navbar";

export default function Projects() {
  return (
    <div className="min-h-screen bg-[#e7dfd8]">
      <Navbar activeSection="projects" />
      <div className="pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center animate-fade-in">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((project) => (
              <div
                key={project}
                className="bg-[#e7dfd8] dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-video bg-gray-200 dark:bg-gray-800"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Project {project}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    A brief description of the project and its key features.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="text-blue-600 hover:underline">View Project →</a>
                    <a href="#" className="text-blue-600 hover:underline">GitHub →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 