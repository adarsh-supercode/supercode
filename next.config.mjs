/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["staging.supercode.in"],
  },
  webpack: (config, { isServer }) => {
    // Add GLSL loader
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: [
        'raw-loader',
        'glslify-loader'
      ],
    });

    return config;
},
};

export default nextConfig;
