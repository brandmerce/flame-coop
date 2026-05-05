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
    // EXACT-MATCH alias (`$` suffix) for the bare 'react' import only.
    // - `import x from 'react'`          → matched → our shim (adds useEffectEvent)
    // - `import x from 'react/jsx-runtime'` → NOT matched → real react/jsx-runtime
    // - `import x from 'react/index.js'`    → NOT matched → real react (used by shim)
    //
    // Without `$`, webpack treats the alias as a prefix and rewrites every
    // subpath import (jsx-runtime, jsx-dev-runtime, etc.) relative to the
    // shim file, breaking JSX compilation across the whole app.
    config.resolve.alias['react$'] = path.resolve(__dirname, 'lib/react-compat.js')
    return config
  },
};

module.exports = nextConfig;
