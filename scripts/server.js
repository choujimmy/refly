/* @flow */
import path from 'path'
import cp from 'child_process'
import { serverConfig } from './webpack.config'
import { ServerInstance } from './types/process.d'

const RUNNING_REGEXP = /服务启动成功, 侦听地址 http:\/\/(.*?)\//

let serverInstance: ServerInstance
const { output } = serverConfig
const serverPath = path.join(output.path, output.filename)

// 运行或者重启nodejs服务端
const server = (): Promise<ServerInstance> => {
  return new Promise(resolve => {
    let pending = true

    const onStdOut = (data) => {
      const time = new Date().toTimeString()
      const match = data.toString('utf8').match(RUNNING_REGEXP)

      process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '))
      process.stdout.write(data)

      if (match) {
        serverInstance.host = match[1]
        serverInstance.stdout.removeListener('data', onStdOut)
        serverInstance.stdout.on('data', x => process.stdout.write(x))
        pending = false
        resolve(serverInstance)
      }
    }

    if (serverInstance) {
      serverInstance.kill('SIGTERM')
    }

    serverInstance = cp.spawn('node', [serverPath], {
      env: Object.assign({ NODE_ENV: 'development' }, process.env)
    })

    if (pending) {
      serverInstance.once('exit', (code, signal) => {
        if (pending) {
          throw new Error(`服务异常中断, 错误代码: ${code} 信号: ${signal}`)
        }
      })
    }

    serverInstance.stdout.on('data', onStdOut)
    serverInstance.stderr.on('data', x => process.stderr.write(x))

    return serverInstance
  })
}

process.on('exit', () => {
  if (serverInstance) {
    serverInstance.kill('SIGTERM')
  }
})

export default server
