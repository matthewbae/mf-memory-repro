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
          shared: {},
        })
      );
    }

    console.log(config);

    return config;
  },
};

module.exports = nextConfig;
