const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const packageJson = require("../package.json");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = merge(common, {
  mode: "development",
  devServer: {
    static: "./dist",
    hot: true,
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        marketingApp: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
});
