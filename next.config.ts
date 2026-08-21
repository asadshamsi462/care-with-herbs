import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uexchunksitoprzynrpf.supabase.co",
      },
    ],
  },
};

export default nextConfig;