const format = (time) => {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')
}

const run = (fn, options) => {
  const task = typeof fn.default === 'undefined' ? fn : fn.default
  const start = new Date()
  console.log(
    `[${format(start)}] '${task.name}${options ? ` (${options})` : ''}' 任务启动...`
  )
  return task(options).then(resolution => {
    const end = new Date()
    const time = end.getTime() - start.getTime()
    console.log(
      `[${format(end)}] '${task.name}${options ? ` (${options})` : ''}' 任务结束，耗时 ${time} 毫秒`
    )
    return resolution
  })
}

if (require.main === module && process.argv.length > 2) {
  delete require.cache[__filename]
  const module = require(`./${process.argv[2]}.js`).default
  run(module).catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
}

export default run
