/* @flow */
import webpack from 'webpack'
import { existsSync } from 'fs'
import { cleanDir } from './lib/fs'
import dllConfig from './webpack/config.dll'
/**
 * 创建第三方依赖索引
 */
const dll = async () => {
  if (process.argv.includes('--force')) {
    await cleanDir('build/public/vendor', {
      nosort: true,
      dot: true
    })
  }
  if (!existsSync('build/public/vendor/manifest.json')) {
    await new Promise((resolve, reject) => {
      webpack(dllConfig).run((err, stats) => {
        if (err) {
          return reject(err)
        }

        console.log(stats.toString(dllConfig.stats))
        return resolve()
      })
    })
  }
}

export default dll
