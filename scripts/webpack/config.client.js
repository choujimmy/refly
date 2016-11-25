/* @flow */
import path from 'path'
import { readFileSync } from 'fs'
import webpack from 'webpack'
import AssetsPlugin from 'assets-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const isDebug = !process.argv.includes('--release')
const isVerbose = process.argv.includes('--verbose')

const config = {
  context: path.resolve(__dirname, '../../src'),
  entry: [
    './browser/index.js',
    ...isDebug ? [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client'
    ] : []
  ],
  target: 'web',
  devtool: isDebug ? 'cheap-module-source-map' : false,
  output: {
    path: path.resolve(__dirname, '../../build/public/assets'),
    publicPath: '/assets/',
    sourcePrefix: '  ',
    filename: isDebug ? '[name]-[hash].js' : '[name].[hash].js',
    chunkFilename: isDebug ? '[name]-[chunkhash].[id].js' : '[name].[id].[chunkhash].js'
  },
  resolve: {
    modules: [path.resolve(__dirname, '../../src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },
  cache: isDebug,
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
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../../src')
        ],
        query: {
          cacheDirectory: isDebug,
          babelrc: false,
          presets: [
            ['latest', {
              es2015: {
                modules: false
              }
            }],
            'stage-0',
            'react',
            ...isDebug ? [] : [
              'react-optimize'
            ]
          ],
          plugins: [
            'transform-runtime',
            'transform-flow-strip-types',
            ...!isDebug ? [] : [
              'transform-react-jsx-source',
              'transform-react-jsx-self',
              'react-hot-loader/babel'
            ]
          ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader'
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            `css-loader?${JSON.stringify({
              sourceMap: isDebug,
              minimize: !isDebug
            })}`
          ]
        })
      },
      {
        test: /\.(eot|ttf|wav|mp3|png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'file-loader',
        query: {
          name: isDebug ? '[name]-[hash].[ext]' : '[hash].[ext]'
        }
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        debug: isDebug,
        context: __dirname,
        output: {
          path: path.join(__dirname, '../../static')
        }
      }
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __DEV__: isDebug
    }),

    new webpack.DllReferencePlugin({
      manifest: JSON.parse(readFileSync(path.resolve(__dirname, '../../build/public/vendor/manifest.json'), 'utf-8')),
      context: path.resolve(__dirname, '../../src')
    }),

    // 使用assets-webpack-plugin插件生成包含文件的路径json文件
    new AssetsPlugin({
      path: path.resolve(__dirname, '../../build'),
      filename: 'assets.json'
    }),

    new ExtractTextPlugin({
      filename: isDebug ? '[name]-[chunkhash].css' : '[name].[chunkhash].css',
      allChunks: true
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
