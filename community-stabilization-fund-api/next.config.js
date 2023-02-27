/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
  },
  publicRuntimeConfig: {
    apiUrl: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api` // development api
      : 'http://localhost:3000/api' // production api
  }
};

export default nextConfig;
