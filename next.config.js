/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost'], // 允许加载来自 localhost 的图片
  },
}

module.exports = nextConfig;
