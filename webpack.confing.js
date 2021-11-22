const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: "/",
    filename: "bundle.js",
  },
  devtool: "eval-source-map",
  watch: true,
};
