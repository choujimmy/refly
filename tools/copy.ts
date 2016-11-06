import * as path from 'path'
import { writeFile, copyFile, makeDir, copyDir, cleanDir } from './lib/fs'

const gaze = require('gaze')
const pkg = require('../package.json')

/**
 * 拷贝静态站点文件到输出文件夹, 例如sitemap.xml robots.txt favicon.ico
 */
const copy = async () => {
  await makeDir('build')
  await Promise.all([
    writeFile(
      'build/package.json',
      JSON.stringify(
        {
          private: true,
          engines: pkg.engines,
          dependencies: pkg.dependencies,
          scripts: {
            start: 'node server.js'
          }
        },
        null,
        2)
    ),
    copyDir('src/public', 'build/public')
  ])

  if (process.argv.indexOf('--watch') > -1) {
    const watcher = await new Promise<any>((resolve, reject) => {
      gaze(['src/public/**/*'], (err: Error, val: any) => (err ? reject(err) : resolve(val)))
    })

    watcher.on('all', async (event: string, filePath: string) => {
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
      console.log(`[file ${event}] ${dist}`)
    })
  }
}

export default copy
