/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fna.fbcdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },
  redirects: async () => {
    const currentYear = new Date().getFullYear();
    return [
      {
        source: "/team",
        destination: `/team/${currentYear}`,
        permanent: true,
      },
      // for backwards compatibility
      {
        source: "/teams",
        destination: `/team/${currentYear}`,
        permanent: true,
      },
      {
        source: "/teams/:year",
        destination: `/team/${currentYear}`,
        permanent: true,
      },
    ];
  },
};

export default config;
