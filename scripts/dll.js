/* @flow */
import webpack from 'webpack'
import dllConfig from './webpack/config.dll'

/**
 * 创建第三方依赖索引
 */
const dll = () => {
  return new Promise((resolve, reject) => {
    webpack(dllConfig).run((err, stats) => {
      if (err) {
        return reject(err)
      }

      console.log(stats.toString(dllConfig.stats))
      return resolve()
    })
  })
}

export default dll
