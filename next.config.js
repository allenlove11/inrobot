/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', '38.242.197.100'], // 添加您的 Strapi 服务器 IP
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' http: https: data: blob: 'unsafe-inline'"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig;
