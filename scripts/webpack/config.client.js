/* @flow */
import path from 'path'
import webpack from 'webpack'
import AssetsPlugin from 'assets-webpack-plugin'

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
  devtool: isDebug ? 'source-map' : false,
  output: {
    path: path.resolve(__dirname, '../../build/public/assets'),
    publicPath: '/assets/',
    sourcePrefix: '  ',
    filename: isDebug ? '[name].js?[hash]' : '[name].[hash].js',
    chunkFilename: isDebug ? '[name].[id].js?[chunkhash]' : '[name].[id].[hash].js'
  },
  resolve: {
    modules: [path.resolve(__dirname, '../../src'), 'node_modules'],
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.json']
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
            'react',
            ['latest', {
              es2015: {
                modules: false
              }
            }],
            'stage-0'
          ],
          plugins: [
            'transform-runtime',
            'transform-flow-strip-types',
            ...isDebug ? [
              'react-hot-loader/babel',
              'transform-react-jsx-source',
              'transform-react-jsx-self'
            ] : [
              'transform-react-remove-prop-types',
              'transform-react-constant-elements',
              'transform-react-inline-elements'
            ],
            ['react-intl',
              {
                enforceDescriptions: true
              }
            ]
          ]
        }
      },
      {
        test: /\.css/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: isDebug,
            minimize: !isDebug
          })}`
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({
            importLoaders: 2,
            sourceMap: isDebug,
            modules: true,
            localIdentName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
            minimize: !isDebug
          })}`,
          'postcss-loader',
          'sass-loader'
        ]
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
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        query: {
          name: isDebug ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
          limit: 10000
        }
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
        query: {
          name: isDebug ? '[path][name].[ext]?[hash]' : '[hash].[ext]'
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
        },
        postcss: (bundler) => [
          require('autoprefixer')({ browsers: ['last 2 versions'] })
        ]
      }
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __DEV__: isDebug
    }),

    // 使用assets-webpack-plugin插件生成包含文件的路径json文件
    // https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: path.resolve(__dirname, '../../build'),
      filename: 'assets.json'
    }),

    new webpack.optimize.OccurrenceOrderPlugin(true),

    ...isDebug ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: isVerbose
        }
      })
    ]
  ]
}

export default config
