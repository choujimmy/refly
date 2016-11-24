/* @flow */
import notifier from 'node-notifier'
import colors from 'colors'

type NotifyOption = {
  title: string,
  message: string,
  level?: string
}

const notify = (options: NotifyOption) => {
  const title = options.title
    ? `${options.title.toUpperCase()}`
    : 'Refly'

  notifier.notify({
    title,
    message: options.message
  })

  const level = options.level || 'info'
  const msg = `==> [${title}] -> ${options.message}`

  switch (level) {
    case 'warn':
      console.log(colors.red(msg))
      break
    case 'error':
      console.log(colors.bgRed.white(msg))
      break
    case 'info':
    default:
      console.log(colors.green(msg))
  }
}

export default notify
