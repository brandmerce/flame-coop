const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.pages.dev', '*.vercel.app'],
    },
  },
  webpack(config) {
    // Shim the bare 'react' import so packages that import the not-yet-stable
    // `useEffectEvent` (e.g. @sanity/vision in sanity v5) don't break the build.
    config.resolve.alias['react'] = path.resolve(__dirname, 'lib/react-compat.js')

    // Re-wire react subpath imports that the alias above would otherwise break.
    // webpack resolves 'react/jsx-runtime' relative to the aliased file's
    // directory, so we point each subpath explicitly back to the real React.
    const reactDir = path.dirname(require.resolve('react/package.json'))
    for (const sub of ['jsx-runtime', 'jsx-dev-runtime']) {
      config.resolve.alias[`react/${sub}`] = path.resolve(reactDir, sub)
    }

    return config
  },
};

module.exports = nextConfig;
