const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "http://localhost:8081/", // Public path for assets
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".cjs", ".mjs"], // Resolve these file extensions
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx|cjs|mjs)$/, // Match .js, .jsx, .ts, .cjs., .tsx, and .mjs files
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Use Babel for JavaScript and TypeScript
          options: {
            presets: [
              "@babel/preset-env", // For JavaScript
              "@babel/preset-react", // For React
              "@babel/preset-typescript", // For TypeScript
            ],
            plugins: ["@babel/plugin-transform-runtime"], // For TypeScript
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // يحقن CSS في DOM (مفيد لبيئة التطوير)
          "css-loader", // يحول CSS إلى JavaScript
          "postcss-loader", // يعالج CSS باستخدام PostCSS (مطلوب لـ Tailwind CSS)
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(), // Add TypeScript type checking
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
