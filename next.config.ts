/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'your-production-domain.com'],
    },
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
