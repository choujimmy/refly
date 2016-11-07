import * as Koa from 'koa'
import * as React from 'react'
import * as UniversalRouter from 'universal-router'

import configureStore from '../common/configureStore'
import { setVariable } from '../common/actions/runtime'
import routes from '../browser/routes'
import { Page, Context, AppContext } from '../browser/routes/context'

declare var __DEV__: boolean

const render = () => {
  return async (ctx: Koa.Context, next: any) => {
    try {
      const store = configureStore(
        {
          user: (ctx as any).session.user || null
        },
        {
          cookie: ctx.headers['cookie']
        }
      )
      store.dispatch(setVariable('initialNow',Date.now()))

      const css = new Set()

      const context: Context = {
        insertCss: (...styles: any[]) => {
          styles.forEach(style => css.add(style._getCss()))
        },
        store
      }

      const route = await UniversalRouter.resolve<AppContext, Page>(
        routes,
        {
          insertCss: context.insertCss,
          store: context.store,
          path: ctx.originalUrl,
          query: ctx.query
        }
      )

      if (route.redirect) {
        ctx.redirect(route.status || 302, route.redirect)
        return
      }

      const data = { ...route }
      data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>)
      data.style = [...css].join('')
      data.script = assets.main.js
      data.state = context.store.getState()
      data.lang = locale
      data.chunk = assets[route.chunk] && assets[route.chunk].js

      const html = ReactDOM.renderToStaticMarkup(<Html {...data} />)

      ctx.status = route.status || 200
      ctx.body = `<!doctype html>${html}`
    } catch (err) {
      console.log('服务端渲染错误', err)
      next(err)
    }
  }
}

export default render
