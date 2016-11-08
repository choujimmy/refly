import path from 'path'
import webpack from 'webpack'
import extend from 'extend'
import AssetsPlugin from 'assets-webpack-plugin'
import autoprefixer from 'autoprefixer'

const INTL_REQUIRE_DESCRIPTIONS = true

const isDebug = !process.argv.includes('--release')
const isVerbose = process.argv.includes('--verbose')

//
// webpack客户端和服务端打包公共部分
// -----------------------------------------------------------------------------
const config = {
  context: path.resolve(__dirname, '../src'),

  output: {
    path: path.resolve(__dirname, '../build/public/assets'),
    publicPath: '/assets/',
    sourcePrefix: '  '
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../src')
        ],
        query: {
          cacheDirectory: isDebug,
          babelrc: false,
          presets: [
            'react',
            'latest',
            'stage-0'
          ],
          plugins: [
            'transform-runtime',
            ...isDebug ? [
              'transform-react-jsx-source',
              'transform-react-jsx-self'
            ] : [
              'transform-react-remove-prop-types',
              'transform-react-constant-elements',
              'transform-react-inline-elements'
            ],
            ['react-intl',
              {
                enforceDescriptions: INTL_REQUIRE_DESCRIPTIONS
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
          path: path.join(__dirname, '../static')
        }
      }
    })
  ],

  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
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
  }
}

//
// 客户端配置部分
// -----------------------------------------------------------------------------

const clientConfig = extend(true, {}, config, {
  entry: './clientLoader.js',

  output: {
    filename: isDebug ? '[name].js?[chunkhash]' : '[name].[chunkhash].js',
    chunkFilename: isDebug ? '[name].[id].js?[chunkhash]' : '[name].[id].[chunkhash].js'
  },

  target: 'web',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      __DEV__: isDebug
    }),

    // 使用assets-webpack-plugin插件生成包含文件的路径json文件
    // https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: path.resolve(__dirname, '../build'),
      filename: 'assets.js',
      processOutput: x => `module.exports = ${JSON.stringify(x)}`
    }),

    new webpack.optimize.OccurrenceOrderPlugin(true),

    ...isDebug ? [] : [

      new webpack.optimize.DedupePlugin(),

      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: isVerbose
        }
      })
    ]
  ],

  devtool: isDebug ? 'source-map' : false
})

//
// 服务端配置部分
// -----------------------------------------------------------------------------

const serverConfig = extend(true, {}, config, {
  entry: './server.js',

  output: {
    filename: '../../server.js',
    libraryTarget: 'commonjs2'
  },

  target: 'node',

  externals: [
    /^\.\/assets$/,
    (context, request, callback) => {
      const isExternal =
        request.match(/^[@a-z][a-z/.\-0-9]*$/i) &&
        !request.match(/\.(css|less|scss|sss)$/i)
      callback(null, Boolean(isExternal))
    }
  ],

  plugins: [
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
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },

  devtool: 'source-map'
})

export default [clientConfig, serverConfig]
