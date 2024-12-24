/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
  },
  // Ensure these packages are transpiled
  transpilePackages: [
    '@radix-ui/react-slot',
    'lucide-react',
    'next-themes'
  ],
  // Enable Vercel Speed Insights
  speedInsights: {
    enabled: true,
  },
  // Enable Vercel Analytics
  analytics: {
    enabled: true,
  }
}

module.exports = nextConfig
