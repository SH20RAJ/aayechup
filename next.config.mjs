/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/6.x/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '**',
      },
    ],
  },
};

// Import statements should be at the top of the file
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

// Initialize Cloudflare for development
initOpenNextCloudflareForDev();

export default nextConfig;
