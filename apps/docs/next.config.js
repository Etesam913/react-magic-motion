const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

module.exports = withNextra({
  transpilePackages: ["react-magic-motion"],
  reactStrictMode: false,
  images: {
    domains: ["storage.googleapis.com"],
  },
});
