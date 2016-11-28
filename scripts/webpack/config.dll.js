/* @flow */
import path from 'path'
import webpack from 'webpack'

const isDebug = !process.argv.includes('--release')
const isVerbose = process.argv.includes('--verbose')

const vendors = [
  'history',
  'apollo-client',
  'react',
  'react-dom',
  'react-helmet',
  'serialize-javascript',
  'redux',
  'react-apollo',
  'universal-router',
  'glamor'
]

const config = {
  context: path.resolve(__dirname, '../../src'),
  entry: {
    vendor: vendors
  },
  devtool: isDebug ? 'cheap-module-source-map' : false,
  output: {
    path: path.resolve(__dirname, '../../build/public/vendor'),
    filename: '[name]_[hash].js',
    library: '[name]_[hash]'
  },

  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __DEV__: isDebug
    }),

    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../../build/public/vendor/manifest.json'),
      name: '[name]_[hash]',
      context: path.resolve(__dirname, '../../src')
    }),

    new webpack.optimize.OccurrenceOrderPlugin(true),

    ...isDebug ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ] : [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: isVerbose
        },
        mangle: {
          screw_ie8: true
        },
        output: {
          comments: false,
          screw_ie8: true
        }
      })
    ]
  ]
}

export default config
