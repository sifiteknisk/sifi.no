import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => ({
  // Keep `next dev` from overwriting production build artifacts in `.next`.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  images: {
    domains: ['cdn.sanity.io'],
    deviceSizes: [320, 390, 640, 750, 828, 1080, 1200, 1440, 1600, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 112, 128, 160, 240],
    // Image URLs are content-addressed or deployed with the application.
    // Keep optimized variants warm instead of re-encoding them every few hours.
    minimumCacheTTL: 604800,
  },
});

export default nextConfig;
