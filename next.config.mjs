/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    domains: ['avatars.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
      },
    ],
  },};

export default nextConfig;
