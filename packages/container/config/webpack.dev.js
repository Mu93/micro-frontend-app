const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageJson = require("../package.json");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
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
  output: {
    publicPath: "http://localhost:8080/", // Public path for assets
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", "jsx", "cjs"], // Resolve these file extensions
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|cjs\.js)$/, // Handle .ts, .tsx, and .cjs.js files
        exclude: /node_modules/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
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
        test: /\.css$/,
        use: [
          // 'style-loader', // يحقن CSS في DOM (مفيد لبيئة التطوير)
          // 'css-loader',   // يحول CSS إلى JavaScript
          "postcss-loader", // يعالج CSS باستخدام PostCSS (مطلوب لـ Tailwind CSS)
        ],
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
      name: "host",
      remotes: {
        marketingApp: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
});
