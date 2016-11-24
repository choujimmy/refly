/* @flow */
import clean from './clean'
import copy from './copy'
import run from './run'

process.argv.push('--watch')

/*
 * 运行开发环境web服务器
 * 包含热更新，url同步，多设备间同步等功能
 */
const start = async () => {
  await run(clean)
  await run(copy)
}

export default start
