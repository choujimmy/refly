import * as path from 'path'
import * as cp from 'child_process'

import { serverConfig } from './webpack.config'

const RUNNING_REGEXP = /服务成功在 http:\/\/(.*?)\//

let server: any
const serverPath = path.join(serverConfig.output.path, serverConfig.output.filename)

// 运行或者重启nodejs服务端
const runServer = () => {
  return new Promise<any>((resolve) => {
    let pending = true

    const onStdOut = (data: Buffer) => {
      const time = new Date().toTimeString()
      const match = data.toString('utf8').match(RUNNING_REGEXP)

      process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '))
      process.stdout.write(data)

      if (match) {
        server.host = match[1]
        server.stdout.removeListener('data', onStdOut)
        server.stdout.on('data', (x: any) => process.stdout.write(x))
        pending = false
        resolve(server)
      }
    }

    if (server) {
      server.kill('SIGTERM')
    }

    server = cp.spawn('node', [serverPath], {
      env: Object.assign({ NODE_ENV: 'development' }, process.env)
    })

    if (pending) {
      server.once('exit', (code: any, signal: any) => {
        if (pending) {
          throw new Error(`Server terminated unexpectedly with code: ${code} signal: ${signal}`)
        }
      })
    }

    server.stdout.on('data', onStdOut)
    server.stderr.on('data', (x: string | Buffer) => process.stderr.write(x))

    return server
  })
}

process.on('exit', () => {
  if (server) {
    server.kill('SIGTERM')
  }
})

export default runServer
