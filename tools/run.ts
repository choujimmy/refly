const format = (time: Date) => {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')
}

const run = (fn: any, options?: any) => {
  const task = typeof fn.default === 'undefined' ? fn : fn.default
  const start = new Date()
  console.log(`[${format(start)}] '${task.name}${options ? ` (${options})` : ''}'任务开始执行...`)
  return task(options).then((resolution: any) => {
    const end = new Date()
    const time = end.getTime() - start.getTime()
    console.log(`[${format(end)}] '${task.name}${options ? ` (${options})` : ''}'任务在${time}毫秒内执行完毕`)
    return resolution
  })
}

if (require.main === module && process.argv.length > 2) {
  delete require.cache[__filename]
  const module = require(`./${process.argv[2]}.ts`).default
  run(module).catch((err: Error) => {
    console.error(err.stack)
    process.exit(1)
  })
}

export default run
