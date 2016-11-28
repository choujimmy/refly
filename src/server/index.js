/* @flow */
import path from 'path'
import colors from 'colors'
import Koa from 'koa'
import serve from 'koa-static'
import bodyParser from 'koa-bodyparser'

import logMiddleware from './middlewares/log'
import headerMiddleware from './middlewares/header'
import authMiddleware from './middlewares/auth'
import { port } from '../common/config'
import { render } from './render'

const app = new Koa()

//
// 注册 Node.js 中间件
// -----------------------------------------------------------------------------
app.use(serve(path.join(__dirname, 'public'), {
  maxage: 31536000 * 1000
}))
app.use(bodyParser())

//
// API部分
// -----------------------------------------------------------------------------s
app.use(logMiddleware())
app.use(headerMiddleware())
app.use(authMiddleware())

//
// 注册服务端渲染中间件
// -----------------------------------------------------------------------------
app.use(render())

//
// 运行服务端
// -----------------------------------------------------------------------------
app.listen(port, () => {
  console.log(colors.red(`==> [SERVER] -> 服务启动成功, 侦听地址 http://localhost:${port}/`))
})
