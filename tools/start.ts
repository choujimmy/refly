import run from './run'
import runServer from './runServer'
import clean from './clean'
import copy from './copy'
import { clientConfig, serverConfig } from './webpack.config'

const browserSync = require('browser-sync')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

process.argv.push('--watch')

/*
 * 运行开发环境web服务器
 * 包含热更新，url同步，多设备间同步等功能
 */
const start = async () => {
  await run(clean)
  await run(copy)
  await new Promise<any>((resolve: Function) => {
    // Hot Module Replacement (HMR) + React Hot Reload
    if (clientConfig.debug) {
      clientConfig.entry = ['react-hot-loader/patch', 'webpack-hot-middleware/client', clientConfig.entry]
      clientConfig.output.filename = clientConfig.output.filename.replace('[chunkhash]', '[hash]')
      clientConfig.output.chunkFilename = clientConfig.output.chunkFilename.replace('[chunkhash]', '[hash]')
      clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
      clientConfig.plugins.push(new webpack.NoErrorsPlugin())
    }

    const bundler = webpack([clientConfig, serverConfig])
    const wpMiddleware = webpackMiddleware(bundler, {
      publicPath: clientConfig.output.publicPath,
      stats: clientConfig.stats
    })

    const hotMiddleware = webpackHotMiddleware(bundler.compilers[0])

    let handleBundleComplete: any = async () => {
      handleBundleComplete = (stats: any) => !stats.stats[1].compilation.errors.length && runServer()

      const server = await runServer()
      const bs = browserSync.create()

      const bsOption: any = {
        proxy: {
          target: server.host,
          middleware: [wpMiddleware, hotMiddleware]
        }
      }

      if (clientConfig.debug) {
        bsOption.notify = false
        bsOption.ui = false
      }

      bs.init(bsOption, resolve)
    }

    bundler.plugin('done', (stats: any) => handleBundleComplete(stats))
  })
}

export default start
