import * as Koa from 'koa'
import * as debugModule from 'debug'

import { port } from '../common/config'

const debug = debugModule('refly:server')

const app = new Koa()

app.listen(port, () => {
  debug(`服务成功在http://localhost:${port}/启动侦听`)
})

