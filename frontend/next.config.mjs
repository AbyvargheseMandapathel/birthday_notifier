/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: [
      'test.birthdayremainder.online',
      'birthdayremainder.online',
    ],
  },
};

export default nextConfig;
