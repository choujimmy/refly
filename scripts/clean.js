/* @flow */
import { cleanDir } from './lib/fs'

/**
 * 清除输出目录(build)
 */
const clean = async () => {
  return Promise.all([
    cleanDir('build/*', {
      nosort: true,
      dot: true,
      ignore: ['build/.git', 'build/public']
    }),

    cleanDir('build/public/*', {
      nosort: true,
      dot: true,
      ignore: ['build/public/.git', 'build/public/vendor']
    })
  ])
}

export default clean
