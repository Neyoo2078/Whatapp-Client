/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    ZEGOAPP_ID: 1002377906,
    ZEGO_SERVER_SECRET: '2da4ae4831126ac6be2a72ae02461da0',
    BaseUrl: 'http://localhost:5000',
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
