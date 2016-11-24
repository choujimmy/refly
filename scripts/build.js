/* @flow */
import { existsSync } from 'fs'
import run from './run'
import clean from './clean'
import copy from './copy'
import bundle from './bundle'
import render from './render'
import dll from './dll'
/**
 * 从源代码编译所有工程文件到发布格式，然后拷贝发布文件到build文件夹
 */
const build = async () => {
  await run(clean)
  await run(copy)
  // 判断是否已经生成webpack dll manifest
  if (!existsSync('build/public/vendor/manifest.json')) {
    await run(dll)
  }
  await run(bundle)
  if (process.argv.includes('--static')) {
    await run(render)
  }
}

export default build
