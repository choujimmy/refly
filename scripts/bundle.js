/* @flow */
import webpack from 'webpack'
import clientConfig from './webpack/config.client'
import serverConfig from './webpack/config.server'

/**
 * 从源代码创建应用程序打包文件
 */
const bundle = () => {
  return new Promise((resolve, reject) => {
    webpack([clientConfig, serverConfig]).run((err, stats) => {
      if (err) {
        return reject(err)
      }

      console.log(stats.toString(clientConfig.stats))
      return resolve()
    })
  })
}

export default bundle
