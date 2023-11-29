/** @type {import('next').NextConfig} */

const isHeadless = process.env.AR_MINER_UI_HEADLESS === "true";
const maybeHeadlessConfig = isHeadless
  ? {
      output: "standalone",
      distDir: "dist-headless",
    }
  : {};

module.exports = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...maybeHeadlessConfig,
  webpack: (config) => {
    return config;
  },
};
