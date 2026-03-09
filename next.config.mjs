/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Enables static site generation
    experimental: {
      optimizePackageImports: ["react-icons"],
    },
    images: {
      unoptimized: true, // Required for static export if using Next.js Image component
    },
};

export default nextConfig;
