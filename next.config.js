/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Optimize loading of third-party scripts
    optimizePackageImports: ['react-scroll', 'micromodal'],
    // Server Actions configuration
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  // Configure package transpilation
  transpilePackages: ['@tremor/react'],
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
  }
}

module.exports = nextConfig
