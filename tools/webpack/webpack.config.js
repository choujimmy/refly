const path = require('path')
const webpack = require('webpack')

const isDebug = !(process.env.NODE_ENV === 'production')

const config = {
  context: path.resolve(__dirname, '../../src'),
  output: {
    path: path.resolve(__dirname, '../../build/public/assets'),
    publicPath: '/assets/',
    sourcePrefix: '  '
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname, '../../src'), 'node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        debug: isDebug,
        context: __dirname,
        output: {
          path: path.join(__dirname, '../static')
        }
      }
    })
  ]
}

module.exports = config
