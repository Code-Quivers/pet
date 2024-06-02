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
      {
        hostname: "http://etphonehomebands.com",
        protocol: "http",
        pathname: "/**",
      },
      {
        hostname: "https://etphonehomebands.com",
        protocol: "https",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
