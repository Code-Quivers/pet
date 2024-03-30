/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["localhost", "localhost:3001"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
