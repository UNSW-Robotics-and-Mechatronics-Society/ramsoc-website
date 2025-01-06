import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fna.fbcdn.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
