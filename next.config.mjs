// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  // your existing Next.js config...
  // e.g. reactStrictMode, swcMinify, etc.
};

export default createNextIntlPlugin({
  locales: ['ar','en'],
  defaultLocale: 'ar',
  // optional:
  // localeDetection: false,
  // localePrefix: 'always'
})(nextConfig);
