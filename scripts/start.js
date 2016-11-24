/* @flow */
import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackHotMiddleware from 'webpack-hot-middleware'
import compression from 'compression'
import { existsSync } from 'fs'

import run from './run'
import server from './server'
import clientConfig from './webpack/config.client'
import serverConfig from './webpack/config.server'
import webpackMiddleware from './lib/middleware'
import notify from './lib/notify'
import clean from './clean'
import copy from './copy'
import dll from './dll'

process.argv.push('--watch')

/*
 * 运行开发环境web服务器
 * 包含热更新，url同步，多设备间同步等功能
 */
const start = async () => {
  await run(clean)
  await run(copy)
  // 判断是否已经生成webpack dll manifest
  if (!existsSync('build/public/vendor/manifest.json')) {
    await run(dll)
  }
  await new Promise(resolve => {
    notify({
      title: 'WEBPACK',
      message: '开始打包客户端和服务端代码'
    })
    const bundler = webpack([clientConfig, serverConfig])
    const wpMiddleware = webpackMiddleware(bundler, {
      publicPath: clientConfig.output.publicPath,
      stats: clientConfig.stats
    })
    const hotMiddleware = webpackHotMiddleware(bundler.compilers[0])

    let handleBundleComplete = async () => {
      handleBundleComplete = stats => !stats.stats[1].compilation.errors.length && server()

      const { host } = await server()
      const bs = browserSync.create()

      const bsOption = {
        ...(clientConfig.cache ? {} : { ui: false }),
        open: false,
        notify: false,
        proxy: {
          target: host,
          middleware: [wpMiddleware, hotMiddleware],
          proxyOptions: {
            xfwd: true
          }
        }
      }

      if (process.argv.includes('--compress')) {
        bsOption.proxy.middleware.unshift(compression())
      }

      bs.init(bsOption, resolve)
    }

    bundler.plugin('done', stats => handleBundleComplete(stats))
  })
}

export default start
