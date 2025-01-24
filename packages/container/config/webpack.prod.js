const { ModuleFederationPlugin } = require("webpack").container;
const packageJson = require("../package.json");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// Define domains for each microfrontend
const marketingDomain = process.env.MARKETING_DOMAIN || "http://localhost:8081"; // Fallback to localhost if MARKETING_DOMAIN is not set
// const cartDomain = process.env.CART_DOMAIN || "http://localhost:8082"; // Fallback to localhost if CART_DOMAIN is not set

// Log warnings if domains are not set
if (!process.env.MARKETING_DOMAIN) {
  console.warn("MARKETING_DOMAIN is not set. Falling back to localhost.");
}
// if (!process.env.CART_DOMAIN) {
//   console.warn("CART_DOMAIN is not set. Falling back to localhost.");
// }

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js", // Use hash for better caching
    path: path.resolve(__dirname, "../dist"), // Ensure the output directory is correct
    publicPath: "auto", // Automatically determine public path based on the domain
  },
  devtool: "source-map", // Add source maps for debugging
  plugins: [
    new CleanWebpackPlugin(), // Clean the output directory before each build
    new ModuleFederationPlugin({
      name: "container", // Name of the main app
      remotes: {
        marketingApp: `marketing@${marketingDomain}/remoteEntry.js`, // Marketing app's remote entry
        // cart: `cart@${cartDomain}/remoteEntry.js`, // Cart app's remote entry
      },
      shared: {
        ...packageJson.dependencies, // Share all dependencies
        react: {
          singleton: true,
          eager: true,
          requiredVersion: packageJson.dependencies.react,
        }, // Ensure React is shared as a singleton
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        }, // Ensure ReactDOM is shared as a singleton
      },
    }),
  ],
});
