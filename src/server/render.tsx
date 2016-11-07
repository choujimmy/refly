import * as Koa from 'koa'
import * as React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import * as UniversalRouter from 'universal-router'
import * as fs from 'fs'

import configureStore from '../common/configureStore'
import { setVariable } from '../common/actions/runtime'
import routes from '../browser/routes'
import { Page, Context } from '../browser/routes/context'
import App from '../browser/components/App'
import Html from './Html'

const assets = JSON.parse(fs.readFileSync(__dirname + '/assets.json').toString())

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

      const context = {
        insertCss: (...styles: any[]) => {
          styles.forEach(style => css.add(style._getCss()))
        },
        store
      }
      const route = await UniversalRouter.resolve<Context, Page>(
        routes,
        {
          insertCss: context.insertCss,
          store: context.store,
          path: ctx.originalUrl,
          query: ctx.query
        }
      )

      if (route.redirect) {
        ctx.status = route.status || 302
        ctx.redirect(route.redirect)
        return
      }

      const html = renderToStaticMarkup(
        <Html
          title={route.title}
          description={route.description}
          style={[...css].join('')}
          script={assets.main.js}
          state={context.store.getState()}
          chunk={assets[route.chunk] && assets[route.chunk].js}
          children={renderToString(
            <App store={context.store} insertCss={context.insertCss}>
              {route.component}
            </App>
          )}
        />
      )
      ctx.status = route.status || 200
      ctx.body = `<!doctype html>${html}`
    } catch (err) {
      console.log('服务端渲染错误', err)
      next(err)
    }
  }
}

export default render
