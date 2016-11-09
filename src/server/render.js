/* @flow */
import Koa from 'koa'
import React from 'react'
import ReactDOM from 'react-dom/server'
import UniversalRouter from 'universal-router'
import { readFileSync } from 'fs'

import App from '../browser/components/App'
import Html from './Html'
import routes from '../browser/routes'
import configureStore from '../common/store/configureStore'
import { setInitialNow, setAvailableLocales } from '../common/reducers/runtime/actions'
import { setLocale } from '../common/reducers/intl/actions'
import { locales } from '../common/config'

const assets = JSON.parse(readFileSync(`${__dirname}/assets.json`, 'utf-8'))

const render = () => {
  return async (ctx: Koa.context, next: Function) => {
    try {
      const store = configureStore({
        user: ctx.session.user || null
      }, {
        cookie: ctx.headers['cookie']
      })

      store.dispatch(setInitialNow(Date.now()))
      store.dispatch(setAvailableLocales(locales))

      const locale = ctx.state.language
      await store.dispatch(setLocale(locale))

      const css = new Set()

      const context = {
        insertCss: (...styles) => {
          styles.forEach(style => css.add(style._getCss()))
        },
        store
      }

      const route = await UniversalRouter.resolve(routes, {
        ...context,
        path: ctx.originalUrl,
        query: ctx.query,
        locale
      })

      if (route.redirect) {
        ctx.redirect(route.status || 302, route.redirect)
        return
      }

      const data = { ...route }
      data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>)
      data.style = [...(css:any)].join('')
      data.script = assets.main.js
      data.state = context.store.getState()
      data.lang = locale
      data.chunk = assets[route.chunk] && assets[route.chunk].js

      const html = ReactDOM.renderToStaticMarkup(<Html {...data} />)

      ctx.status = route.status || 200
      ctx.body = `<!doctype html>${html}`
    } catch (err) {
      next(err)
    }
  }
}

export { render }
