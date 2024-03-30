/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [
    //   "localhost",
    //   "images.unsplash.com",
    //   "cdn.pixabay.com",
    //   "readymadeui.com",
    //   "tailwindcss.com",
    // ],
    remotePatterns: [
      {
        hostname: "localhost",
        port: "9000",
        protocol: "http",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
