const extend = require('extend')
const webpack = require('webpack')

const serverConfig = require('./webpack.config.server')

const serverDevConfig = extend(true, {}, serverConfig, {
  watch: true,
  devtool: 'source-map',
  cache: true,

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
})

serverDevConfig.plugins.push(
  new webpack.NoErrorsPlugin()
)

module.exports = serverDevConfig
