/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
  // Evita warning de múltiplos lockfiles e garante caminhos relativos corretos em build
  outputFileTracingRoot: process.cwd(),
};

module.exports = nextConfig;
