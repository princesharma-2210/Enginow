/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.com https://*.clerk.dev https://*.clerk.accounts.dev;
              connect-src 'self' https://api.clerk.com https://*.clerk.accounts.dev;
              img-src 'self' data: https://clerk.com;
              style-src 'self' 'unsafe-inline';
              frame-src 'self' https://clerk.com https://*.clerk.dev https://*.clerk.accounts.dev https://www.youtube.com https://www.youtube-nocookie.com;
              worker-src 'self' blob: https://*.clerk.accounts.dev;
            `.replace(/\n/g, " "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
