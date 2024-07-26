/** @type {import('next').NextConfig} */
import UnoCSS from '@unocss/webpack'

const nextConfig = {
  // 关闭react严格模式
  reactStrictMode: false,
  webpack: (config) => {
    config.cache = false
    config.plugins.push(
      UnoCSS(),
    )
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config
  },
};

export default nextConfig;
