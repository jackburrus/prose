const nextConfig = {
  /* config options here */
  env: {
    NFTStorage: process.env.NFTStorage,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['bit.ly'],
  },
}

module.exports = nextConfig
