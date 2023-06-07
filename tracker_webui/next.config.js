/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self';
  content-src 'self';
  script-src 'self';
  style-src 'self';
  font-src 'self';
`;

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      // {
      //   source: "/(.*)",
      //   headers: securityHeaders,
      // },
    ];
  },
};

module.exports = nextConfig;
