const path = require("path");
const projectPath = require('./projectPath.js');

const chalk = require("chalk");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const ProgressBarWebpackPlugin = require("progress-bar-webpack-plugin");

const sourcePath = path.resolve(projectPath, "./src");

// 压缩CSS
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 复制静态文件
const CopyWebpackPlugin = require("copy-webpack-plugin");

// 需要load的模块
const includeSourcePaths = [
  sourcePath,
];

module.exports = {
  entry: path.resolve(projectPath, "./src/main.jsx"),
  output: {
    path: path.resolve(projectPath, "./dist"),
    filename: "build.[name].[contenthash:10].js",
    clean: true, // 编译前清理目录
    pathinfo: false, // 清除路径信息
  },
  // cache: {
  //   type: "filesystem" // 文件缓存
  // },
  resolve: {
    alias: {// 路径别名
      "@": sourcePath
    }
  },
  module: {
    rules: [
      {// 图片处理
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },
      {// 字体处理
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {// css 处理
        test: /\.(css|less|scss|sass)$/i,
        use: [
          ...(process.env.NODE_ENV === "production" ? [MiniCssExtractPlugin.loader] : ["style-loader"]),
          "css-loader",
          "postcss-loader",
          { // 多线程
            loader: "thread-loader",
            options: {
              workerParallelJobs: 2
            }
          }
        ]
      },
      {// js 处理
        test: /\.(js|jsx)$/i,
        include: includeSourcePaths,
        use: [
          "babel-loader",
          { // 多线程
            loader: "thread-loader",
            options: {
              workerParallelJobs: 2
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "webpack5-template-react",
      template: path.resolve(projectPath, "./index.html")
    }),
    // 进度条
    new ProgressBarWebpackPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
    }),
    ...(process.env.NODE_ENV === "production" ? [new MiniCssExtractPlugin()] : []),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(projectPath + "/public"),
          to: path.resolve(projectPath + "/dist")
        }
      ]
    })
  ]
}