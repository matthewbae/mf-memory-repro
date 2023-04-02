const NextFederationPlugin = require("@module-federation/nextjs-mf");

const moduleFederationEnabled = process.env.WITH_MF === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, options) {
    if (moduleFederationEnabled) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "nextremote",
          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./components/ExposedComponent": "./components/ExposedComponent",
          },
          remotes: {},
          // Even sharing @mui/icons-material will cause the memory issues albeit more slowly
          shared: {
            // "@mui/icons-material": {
            //   singleton: true,
            //   requiredVersion: false,
            // },
          },
        })
      );
    }

    console.log(config);

    return config;
  },
};

module.exports = nextConfig;
