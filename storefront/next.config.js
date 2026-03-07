const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: process.env.NEXT_PUBLIC_BASE_URL?.startsWith("https")
          ? "https"
          : "http",
        // Extrae el hostname de NEXT_PUBLIC_BASE_URL asegurándose de eliminar el puerto y evitando undefined
        hostname: process.env.NEXT_PUBLIC_BASE_URL
          ? process.env.NEXT_PUBLIC_BASE_URL.replace(/^https?:\/\//, "").split(
              ":"
            )[0]
          : "localhost",
      },
      {
        protocol: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.startsWith(
          "https"
        )
          ? "https"
          : "http",
        // Extrae el hostname de NEXT_PUBLIC_MEDUSA_BACKEND_URL de la misma forma
        hostname: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
          ? process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL.replace(
              /^https?:\/\//,
              ""
            ).split(":")[0]
          : "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ]
  },
  // Nota: Eliminamos serverRuntimeConfig para evitar la advertencia de deprecación de Next.js
}

module.exports = nextConfig
