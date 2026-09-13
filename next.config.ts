import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* App icons on the "other apps" page come from the BitLion catalogue.
       See lib/apps.ts, which drops any icon outside this host. */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bitlion.us",
        port: "",
        pathname: "/apps/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
