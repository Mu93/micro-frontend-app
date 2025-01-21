const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx", // Entry point (can be .js, .ts, or .mjs)
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx|mjs)$/, // Match .js, .jsx, .ts, .tsx, and .mjs files
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
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"], // Add all supported extensions
  },
};
