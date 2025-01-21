const { ModuleFederationPlugin } = require("webpack").container;
const packageJson = require("./package.json");
const common = require("./webpack.common.js");
const domain = process.env.PRODUCTION_DOMAIN;

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js", // استخدام hash لتحسين التخزين المؤقت
    // publicPath: "/", // المسار العام للملفات (يمكن تعديله حسب الحاجة)
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
    new ModuleFederationPlugin({
      name: "container", // اسم التطبيق الرئيسي
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`, // تطبيق marketing الفرعي
      },
      shared: packageJson.dependencies, // مشاركة التبعيات بين التطبيقات
    }),
  ],
});
