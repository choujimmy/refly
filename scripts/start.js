import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import run from './run'
import server from './server'
import webpackConfig from './webpack.config'
import clean from './clean'
import messages from './messages'
import copy from './copy'

process.argv.push('--watch')
const [config] = webpackConfig

/*
 * 运行开发环境web服务器
 * 包含热更新，url同步，多设备间同步等功能
 */
const start = async () => {
  await run(clean)
  await run(messages)
  await run(copy)
  await new Promise(resolve => {
    // Hot Module Replacement (HMR) + React Hot Reload
    if (config.debug) {
      config.entry = ['react-hot-loader/patch', 'webpack-hot-middleware/client', config.entry]
      config.output.filename = config.output.filename.replace('[chunkhash]', '[hash]')
      config.output.chunkFilename = config.output.chunkFilename.replace('[chunkhash]', '[hash]')
      config.module.loaders.find(x => x.loader === 'babel-loader')
        .query.plugins.unshift('react-hot-loader/babel')
      config.plugins.push(new webpack.HotModuleReplacementPlugin())
      config.plugins.push(new webpack.NoErrorsPlugin())
    }

    const bundler = webpack(webpackConfig)
    const wpMiddleware = webpackMiddleware(bundler, {
      publicPath: config.output.publicPath,
      // Pretty colored output
      stats: config.stats
      // For other settings see
      // https://webpack.github.io/docs/webpack-dev-middleware
    })
    const hotMiddleware = webpackHotMiddleware(bundler.compilers[0])

    let handleBundleComplete = async () => {
      handleBundleComplete = stats => !stats.stats[1].compilation.errors.length && server()

      const serverInstance = await server()
      const bs = browserSync.create()

      bs.init({
        ...(config.debug ? {} : { notify: false, ui: false }),
        open: false,
        proxy: {
          target: serverInstance.host,
          middleware: [wpMiddleware, hotMiddleware]
        }
      }, resolve)
    }

    bundler.plugin('done', stats => handleBundleComplete(stats))
  })
}

export default start
