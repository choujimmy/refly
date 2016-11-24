/* @flow */
import path from 'path'
import webpack from 'webpack'

const isDebug = !process.argv.includes('--release')
const isVerbose = process.argv.includes('--verbose')

const vendors = [
  'react',
  'react-dom',
  'react-helmet',
  'react-redux',
  'redux',
  'react-router',
  'isomorphic-fetch',
  'glamor'
]

const config = {
  context: path.resolve(__dirname, '../../src'),
  entry: {
    vendor: vendors
  },
  output: {
    path: path.resolve(__dirname, '../../build/public/vendor'),
    filename: '[name]_[chunkhash].js',
    library: '[name]_[chunkhash]'
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
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../../build/public/vendor/manifest.json'),
      name: '[name]_[chunkhash]',
      context: path.resolve(__dirname, '../../src')
    })
  ]
}

export default config
