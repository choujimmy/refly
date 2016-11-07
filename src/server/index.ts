import * as path from 'path'
import * as Koa from 'koa'
import * as serve from 'koa-static'
import * as convert from 'koa-convert'
import * as bodyParser from 'koa-bodyparser'
import * as session from 'koa-session'
import * as jwt from 'koa-jwt'
import * as passport from 'koa-passport'

import render from './render'
import { port, auth } from './config'

const app = new Koa()

// 设置全局变量navigator为all，以处理服务端css工具无法获取浏览器属性的问题
// -----------------------------------------------------------------------------
declare var global: any
global.navigator = global.navigator || {}
global.navigator.userAgent = global.navigator.userAgent || 'all'

//
// 注册 Node.js 中间件
// -----------------------------------------------------------------------------
app.use(serve(path.join(__dirname, 'public'), {
  maxage: 31536000 * 1000
}))
app.use(bodyParser())

//
// 认证部分
// -----------------------------------------------------------------------------
app.use(convert(jwt({
  secret: auth.jwt.secret,
  passthrough: true,
  cookie: 'id_token'
})))
app.keys = [auth.sessionKey]
app.use(convert(session(app)))
app.use(passport.initialize())
app.use(passport.session())

app.use(render())

//
// 运行服务端
// -----------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`服务成功在 http://localhost:${port}/ 启动`)
})
