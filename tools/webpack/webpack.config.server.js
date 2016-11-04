const extend = require('extend')
const webpack = require('webpack')

const config = require('./webpack.config')

const isDebug = !(process.env.NODE_ENV === 'production')

const serverConfig = extend(true, {}, config, {
  entry: './server/index.ts',
  target: 'node',
  output: {
    filename: '../../server.js',
    libraryTarget: 'commonjs2'
  },
  externals: [
    /^\.\/assets$/,
    (context, request, callback) => {
      const isExternal =
        request.match(/^[@a-z][a-z/.\-0-9]*$/i) &&
        !request.match(/\.(css|less|scss|sss)$/i)
      callback(null, Boolean(isExternal))
    }
  ]
})

serverConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
    'process.env.BROWSER': false,
    __DEV__: isDebug
  }),
  new webpack.BannerPlugin({
    banner: 'require("source-map-support").install()',
    raw: true,
    entryOnly: false
  }),
  new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
)

module.exports = serverConfig
