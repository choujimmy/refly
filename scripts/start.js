/* @flow */
import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import run from './run'
import server from './server'
import clientConfig from './webpack/config.client'
import serverConfig from './webpack/config.server'
import clean from './clean'
import message from './message'
import copy from './copy'

process.argv.push('--watch')

/*
 * 运行开发环境web服务器
 * 包含热更新，url同步，多设备间同步等功能
 */
const start = async () => {
  await run(clean)
  await run(message)
  await run(copy)
  await new Promise(resolve => {
    // 启用 Hot Module Replacement (HMR) 以及 React Hot Reload
    if (clientConfig.cache) {
      clientConfig.entry = ['react-hot-loader/patch', 'webpack-hot-middleware/client', clientConfig.entry]
      clientConfig.output.filename = clientConfig.output.filename.replace('[chunkhash]', '[hash]')
      clientConfig.output.chunkFilename = clientConfig.output.chunkFilename.replace('[chunkhash]', '[hash]')
      clientConfig.module.loaders.find(x => x.loader === 'babel-loader')
        .query.plugins.unshift('react-hot-loader/babel')
      clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
      clientConfig.plugins.push(new webpack.NoErrorsPlugin())
    }

    const bundler = webpack([clientConfig, serverConfig])
    const wpMiddleware = webpackMiddleware(bundler, {
      publicPath: clientConfig.output.publicPath,
      stats: clientConfig.stats
    })
    const hotMiddleware = webpackHotMiddleware(bundler.compilers[0])

    let handleBundleComplete = async () => {
      handleBundleComplete = stats => !stats.stats[1].compilation.errors.length && server()

      const serverInstance = await server()
      const bs = browserSync.create()

      bs.init({
        ...(clientConfig.cache ? {} : { notify: false, ui: false }),
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
