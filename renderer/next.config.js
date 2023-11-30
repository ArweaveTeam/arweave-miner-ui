/** @type {import('next').NextConfig} */

const isHeadless = process.env.AR_MINER_UI_HEADLESS === "true";
const maybeHeadlessConfig = isHeadless
  ? {
      output: "export",
      distDir: "dist-headless",
    }
  : { output: "export", distDir: process.env.NEXTRON_OUTPUT || "dist" };

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
