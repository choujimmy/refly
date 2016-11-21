/* @flow */
import path from 'path'
import Koa from 'koa'
import convert from 'koa-convert'
import serve from 'koa-static'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
import passport from 'koa-passport'
import mount from 'koa-mount'
import graphqlHTTP from 'koa-graphql'
import jwt from 'koa-jwt'

import { port } from '../common/config'
import { auth } from './secret'
import schema from './schema'
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

//
// API部分
// -----------------------------------------------------------------------------s
app.use(mount('/graphql', convert(graphqlHTTP({
  schema,
  graphiql: true,
  pretty: process.env.NODE_ENV !== 'production'
}))))

//
// 注册服务端渲染中间件
// -----------------------------------------------------------------------------
app.use(render())

//
// 运行服务端
// -----------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`服务启动成功, 侦听地址 http://localhost:${port}/`)
})
