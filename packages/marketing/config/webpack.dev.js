const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const packageJson = require("../package.json");
module.exports = merge(common, {
  mode: "development",
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
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
  output: {
    publicPath: "http://localhost:8081/", // Public path for assets
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", "jsx", "cjs"], // Resolve these file extensions
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|cjs\.js)$/, // Handle .ts, .tsx, and .cjs.js files
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react", // For React JSX support
              "@babel/preset-env", // For modern JavaScript features
            ],
            plugins: [
              "@babel/plugin-transform-runtime", // For async/await and other runtime transformations
            ],
          },
        },
      },
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(), // Add TypeScript type checking
    new ModuleFederationPlugin({
      name: "marketing", // Name of the remote app
      filename: "remoteEntry.js", // Entry file for the remote app
      exposes: {
        "./marketingIndex": "./src/bootstrap", // Expose the bootstrap file
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Use this template for the HTML file
    }),
  ],
});
