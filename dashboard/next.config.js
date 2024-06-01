/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        port: "9000",
        protocol: "http",
        pathname: "/**",
      },
      {
        hostname: "http://85.239.232.185",
        port: "9000",
        protocol: "http",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
