'use client';

import Navbar from "../components/Navbar";

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#e7dfd8]">
      <Navbar activeSection="blog" />
      <div className="pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center animate-fade-in">
            Latest Blog Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((post) => (
              <article
                key={post}
                className="bg-[#e7dfd8] dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-video bg-gray-200 dark:bg-gray-800"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Blog Post {post}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    A brief excerpt from the blog post to entice readers.
                  </p>
                  <a href="#" className="text-blue-600 hover:underline">Read More →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 