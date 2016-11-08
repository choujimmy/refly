/* @flow */
import path from 'path'
import Koa from 'koa'
import convert from 'koa-convert'
import serve from 'koa-static'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
import passport from 'koa-passport'
import mount from 'koa-mount'
import requestLanguage from 'koa-request-language'
import graphqlHTTP from 'koa-graphql'
import jwt from 'koa-jwt'

import './intl/polyfill'
import { port, auth, locales } from './config'
import schema from './schema'
import { render } from './render'

const app = new Koa()

// 设置全局变量navigator为all，以处理服务端css工具无法获取浏览器属性的问题
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {}
global.navigator.userAgent = global.navigator.userAgent || 'all'

//
// 注册 Node.js 中间件
// -----------------------------------------------------------------------------
app.use(serve(path.join(__dirname, 'public'), {
  maxage: 31536000 * 1000
}))

//
// 多语言部分
// -----------------------------------------------------------------------------
app.use(requestLanguage({
  languages: locales,
  queryName: 'lang',
  cookie: {
    name: 'lang',
    options: {
      path: '/',
      maxAge: 3650 * 24 * 3600 * 1000
    },
    url: '/lang/{language}'
  }
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
/*

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage('express')

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)) // eslint-disable-line no-console
  const locale = req.language
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      style={errorPageStyle._getCss()} // eslint-disable-line no-underscore-dangle
      lang={locale}
    >
      {ReactDOM.renderToString(
        <IntlProvider
          locale={locale}
        >
          <ErrorPageWithoutStyle error={err} />
        </IntlProvider>
      )}
    </Html>
  )
  res.status(err.status || 500)
  res.send(`<!doctype html>${html}`)
})
*/

//
// 运行服务端
// -----------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`服务启动成功, 侦听地址 http://localhost:${port}/`)
})
