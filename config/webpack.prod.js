const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const WebpackBundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// 压缩js
const TerserWebpackPlugin = require("terser-webpack-plugin"); // webpack 自带
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

// 分析打包时间 (会和 MiniCssExtractPlugin冲突)
// const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasureWebpackPlugin();

module.exports = 
// smp.wrap(
  merge(commonConfig, {
  mode: "production",
  output: {
    chunkFilename: "chunk.[name].[hash:10].js"
  },
  optimization: {
    splitChunks: {
      chunks: "all", // 公共模块单独打包
      cacheGroups: {
        vendors: { 
          // node_modules里的代码
          // test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10, // 优先级
          enforce: true
        }
      }
    },
    runtimeChunk: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: 4,// 多进程并发运行
      }),
      new CssMinimizerWebpackPlugin({
        parallel: 4,// 多进程并发运行
      })
    ]
  },
  plugins: [
    new WebpackBundleAnalyzerPlugin()
  ]
})
// );