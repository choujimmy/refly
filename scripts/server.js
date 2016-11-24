/* @flow */
import path from 'path'
import cp from 'child_process'
import serverConfig from './webpack/config.server'

const RUNNING_REGEXP = /==> \[SERVER] -> 服务启动成功, 侦听地址 http:\/\/(.*?)\//

let serverProcess: any
const { output } = serverConfig
const serverPath = path.join(output.path, output.filename)

// 运行或者重启nodejs服务端
const server = (): Promise<any> => {
  return new Promise(resolve => {
    let pending = true

    const onStdOut = (data) => {
      const match = data.toString('utf8').match(RUNNING_REGEXP)

      process.stdout.write(data)

      if (match) {
        serverProcess.stdout.removeListener('data', onStdOut)
        serverProcess.stdout.on('data', x => process.stdout.write(x))
        pending = false
        resolve({process: serverProcess, host: match[1]})
      }
    }

    if (serverProcess) {
      serverProcess.kill('SIGTERM')
    }

    serverProcess = cp.spawn('node', [serverPath], {
      env: Object.assign({ NODE_ENV: 'development' }, process.env),
      silent: false
    })

    if (pending) {
      serverProcess.once('exit', (code, signal) => {
        if (pending) {
          throw new Error(`服务异常中断, 错误代码: ${code} 信号: ${signal}`)
        }
      })
    }

    serverProcess.stdout.on('data', onStdOut)
    serverProcess.stderr.on('data', x => process.stderr.write(x))

    return serverProcess
  })
}

process.on('exit', () => {
  if (serverProcess) {
    serverProcess.kill('SIGTERM')
  }
})

export default server
