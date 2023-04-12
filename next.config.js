/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  swcMinify: true,
  images: {
    domains: ["img.pokemondb.net"],
  },
};

module.exports = nextConfig;
