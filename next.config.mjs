/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Enables static site generation
    experimental: {
      optimizePackageImports: ["@geist-ui/core", "react-icons"],
    },
    images: {
      unoptimized: true, // Required for static export if using Next.js Image component
    },
};

export default nextConfig;
