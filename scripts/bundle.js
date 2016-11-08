import webpack from 'webpack'
import webpackConfig from './webpack.config'

/**
 * 从源代码创建应用程序打包文件
 */
const bundle = () => {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        return reject(err)
      }

      console.log(stats.toString(webpackConfig[0].stats))
      return resolve()
    })
  })
}

export default bundle
