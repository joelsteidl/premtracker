/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crests.football-data.org',
        pathname: '/**',
      },
    ],
  },
  // Compiler options
  compiler: {
    // Enable styled-components
    styledComponents: true,
  },
  // Turbopack configuration (stable in Next.js 15)
  turbopack: {
    // Enable Turbopack for faster builds
  },
}

module.exports = nextConfig
