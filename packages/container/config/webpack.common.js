const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageJson = require("../package.json");
const { ModuleFederationPlugin } = require("webpack").container;
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  output: {
    filename: "bundle.js", // اسم ملف الإخراج
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", "jsx", "cjs"], // دعم امتدادات الملفات
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|cjs\.js)$/, // معالجة ملفات TypeScript وJavaScript
        exclude: /node_modules/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react", // دعم React JSX
              "@babel/preset-env", // دعم JavaScript الحديث
            ],
            plugins: [
              "@babel/plugin-transform-runtime", // دعم async/await
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
        test: /\.m?js/, // معالجة ملفات JavaScript النمطية (ES Modules)
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
      shared: packageJson.dependencies, // مشاركة التبعيات
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // قالب HTML
    }),
  ],
};
