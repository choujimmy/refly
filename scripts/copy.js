/* @flow */
import path from 'path'
import gaze from 'gaze'
import { writeFile, copyFile, makeDir, copyDir, cleanDir } from './lib/fs'
import pkg from '../package.json'

/**
 * 拷贝静态站点文件到输出文件夹, 例如sitemap.xml robots.txt favicon.ico
 */
const copy = async () => {
  await makeDir('build')
  await Promise.all([
    writeFile('build/package.json', JSON.stringify({
      private: true,
      engines: pkg.engines,
      dependencies: pkg.dependencies,
      scripts: {
        start: 'node server.js'
      }
    }, null, 2)),
    copyFile('LICENSE', 'build/LICENSE'),
    copyDir('src/common/public', 'build/public')
  ])

  if (process.argv.includes('--watch')) {
    const watcher = await new Promise((resolve, reject) => {
      gaze([
        'src/common/public/**/*'
      ], (err, val) => (err ? reject(err) : resolve(val)))
    })

    watcher.on('all', async (event, filePath) => {
      const dist = path.join('build/', path.relative('src', filePath))
      switch (event) {
        case 'added':
        case 'renamed':
        case 'changed':
          if (filePath.endsWith('/')) {
            return
          }
          await makeDir(path.dirname(dist))
          await copyFile(filePath, dist)
          break
        case 'deleted':
          cleanDir(dist, { nosort: true, dot: true })
          break
        default:
          return
      }
      console.log(`[文件 ${event}] ${dist}`)
    })
  }
}

export default copy
