import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // API Timeout
  publicRuntimeConfig: {
    apiTimeout: process.env.API_TIMEOUT || 5000
  },

  // Laravel Backend Key
  serverRuntimeConfig: {
    secretKey: process.env.SECRET_API_KEY
  }
};

export default nextConfig;
