const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { ModuleFederationPlugin } = require("webpack").container;
const packageJson = require("../package.json");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    static: "./dist", // Ensure this points to the correct directory
    hot: true, // Enable Hot Module Replacement (HMR)
    port: 8081, // Port for the development server
    historyApiFallback: {
      index: "index.html", // Serve index.html for all routes
    },
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
  },

  resolve: {
    alias: {
      // marketingApp: path.resolve(__dirname, ""),
    },
  },

  plugins: [
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
