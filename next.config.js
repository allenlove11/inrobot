/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', '38.242.197.100'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; connect-src 'self' http://38.242.197.100:1337; script-src 'self' 'unsafe-inline' 'unsafe-eval';"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig;
