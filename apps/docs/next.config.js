// module.exports = {
//   reactStrictMode: true,
//   transpilePackages: ["react-motionize"],
// };

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

module.exports = withNextra({
  transpilePackages: ["react-motionize"],
  reactStrictMode: true,
});
