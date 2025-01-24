const { ModuleFederationPlugin } = require("webpack").container;
const packageJson = require("../package.json");
const common = require("./webpack.common.js");
const domain = process.env.PRODUCTION_DOMAIN;
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js", // استخدام hash لتحسين التخزين المؤقت
    // publicPath: "/", // المسار العام للملفات (يمكن تعديله حسب الحاجة)
  },

  plugins: [
    new CleanWebpackPlugin(), // Clean the output directory before each build
    new ModuleFederationPlugin({
      name: "marketing", // Name of the remote app
      filename: "remoteEntry.js", // Entry file for the remote app
      exposes: {
        "./marketingIndex": "./src/bootstrap.tsx", // Expose the bootstrap file
      },
      shared: packageJson.dependencies,
    }),
  ],
});
