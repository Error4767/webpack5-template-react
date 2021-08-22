const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const path = require("path");
const projectPath = require("./projectPath.js");


const webpack = require("webpack");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(commonConfig, {
  mode: "development",
  output: {
    filename: "dev.[name].js"
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    //项目路径
    contentBase: path.resolve(projectPath, "./dist"),
    // 关闭主机检查(以便在外部访问，比如某些云开发空间)
    disableHostCheck: true,
    //启动gzip压缩
    compress: true,
    //端口号
    port: 8080,
    //自动打开浏览器
    open: true,
    //开启HMR
    hot: true
  },
  plugins: [
    // webpack HMR
    new webpack.HotModuleReplacementPlugin(),
    // React HMR
    new ReactRefreshPlugin()
  ]
});