/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', '38.242.197.100'], // 包括 localhost 和您的 VPS IP
  },
}

module.exports = nextConfig
