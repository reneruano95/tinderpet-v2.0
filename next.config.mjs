/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      // configure the allowed origins for localhost & github codespace
      allowedOrigins: [
        "localhost:3000",
        "glowing-space-invention-gv9g79gx97xh9659-3000.app.github.dev",
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "entnnmbtgmxtmgjbfysr.supabase.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "placehold.jp",
        port: "",
      },
    ],
  },
};

export default nextConfig;
