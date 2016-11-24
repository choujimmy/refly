/* @flow */
import notify from './lib/notify'

const run = (fn: Function, options?: string) => {
  const task = typeof fn.default === 'undefined' ? fn : fn.default
  const start = new Date()
  notify({
    title: task.name,
    message: `任务启动${options ? ` (${options})` : ''}`
  })
  return task(options).then(resolution => {
    const end = new Date()
    const time = end.getTime() - start.getTime()
    notify({
      title: task.name,
      message: `任务${options ? ` (${options})` : ''}成功完成，耗时${time}毫秒`
    })
    return resolution
  })
}

// $FlowIssue: https://github.com/facebook/flow/issues/1362
if ((require:any).main === module && process.argv.length > 2) {
  delete require.cache[__filename]
  const module = require(`./${process.argv[2]}.js`).default
  run(module).catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
}

export default run
