const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      'prisma': ['prisma/*'],
    },
  },
  reactStrictMode: false,

};

module.exports = nextConfig;
