import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Azure Blob Storage always serves from a *.blob.core.windows.net
    // subdomain per storage account, so a wildcard host covers every
    // account without hardcoding one. Narrow this to the exact storage
    // account hostname if/when it's confirmed.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.blob.core.windows.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
