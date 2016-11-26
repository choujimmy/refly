/* @flow */
import path from 'path'
import colors from 'colors'
import Koa from 'koa'
import convert from 'koa-convert'
import serve from 'koa-static'
import bodyParser from 'koa-bodyparser'
import mount from 'koa-mount'
import graphqlHTTP from 'koa-graphql'

import { port } from '../common/config'
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
// API部分
// -----------------------------------------------------------------------------s
app.use(mount('/graphql', convert(graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV !== 'production',
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
  console.log(colors.red(`==> [SERVER] -> 服务启动成功, 侦听地址 http://localhost:${port}/`))
})
