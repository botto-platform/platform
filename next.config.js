require("dotenv").config()
const webpack = require("webpack")

module.exports = {
  webpack: (config, { dev }) => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env))
    config.module.rules.push(
      {
        test: /\.css/,
        loader: "emit-file-loader",
        options: {
          name: "dist/[path][name].[ext]"
        }
      },
      {
        test: /\.css$/,
        use: ["babel-loader", "raw-loader", "postcss-loader"]
      }
    )
    return config
  }
}
