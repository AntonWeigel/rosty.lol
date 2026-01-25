import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'assets.tina.io' },
      { hostname: 'ontpgxalgzqwijqsrbyl.supabase.co' },
      { hostname: 'lh3.googleusercontent.com' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/get-started',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
