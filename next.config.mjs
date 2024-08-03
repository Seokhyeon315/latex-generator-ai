// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { webpack }) => {
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /\/__tests__\// }));

    // Important: return the modified config
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },
};

export default nextConfig;
