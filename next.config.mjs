/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000','glowing-space-invention-gv9g79gx97xh9659-3000.app.github.dev']
    }
  }
};

export default nextConfig;