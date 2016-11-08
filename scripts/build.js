import run from './run'
import clean from './clean'
import messages from './messages'
import copy from './copy'
import bundle from './bundle'
import render from './render'

/**
 * 从源代码编译所有工程文件到发布格式，然后拷贝发布文件到build文件夹
 */
const build = async () => {
  await run(clean)
  await run(messages)
  await run(copy)
  await run(bundle)

  if (process.argv.includes('--static')) {
    await run(render)
  }
}

export default build
