/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "img.clerk.com",
      },
      {
        hostname: "placehold.co",
      },
    ],
  },
};

module.exports = nextConfig;
