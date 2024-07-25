// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// next.config.js

const withImages = require('next-images');
module.exports = withImages({
  webpack(config, options) {
    return config;
  },
});
