const merge = require("webpack-merge");
const config = require("./webpack.config");

module.exports = merge(config, {
  devtool: "source-map",

  devServer: {
    port: 8182,
    contentBase: "./src/renderer",
    publicPath: "http://localhost:8182/build/"
  }
});
