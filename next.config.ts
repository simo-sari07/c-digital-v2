/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // Khllih i-sift formats sghar
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Source l-wa7ida dyalk
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};
export default nextConfig;
