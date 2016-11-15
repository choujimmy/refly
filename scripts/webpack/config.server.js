/* @flow */
import path from 'path'
import webpack from 'webpack'

const isDebug = !process.argv.includes('--release')
const isVerbose = process.argv.includes('--verbose')

const config = {
  context: path.resolve(__dirname, '../../src'),
  entry: './server/index.js',
  devtool: 'source-map',
  output: {
    filename: '../../server.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../../build/public/assets'),
    publicPath: '/assets/',
    sourcePrefix: '  '
  },
  target: 'node',
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

  externals: [
    /^\.\/assets$/,
    (context: any, request: string, callback: Function) => {
      const isExternal =
        request.match(/^[@a-z][a-z/.\-0-9]*$/i) &&
        !request.match(/\.(css|less|scss|sss)$/i)
      callback(null, Boolean(isExternal))
    }
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
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
            'latest',
            'stage-0',
            'react',
            ...isDebug ? [] : [
              'react-optimize'
            ]
          ],
          plugins: [
            'transform-runtime',
            'transform-flow-strip-types',
            ['react-intl',
              {
                enforceDescriptions: true
              }
            ],
            ...!isDebug ? [] : [
              'transform-react-jsx-source',
              'transform-react-jsx-self'
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
      'process.env.BROWSER': false,
      __DEV__: isDebug
    }),

    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install()',
      raw: true,
      entryOnly: false
    }),

    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
  ]
}

export default config
