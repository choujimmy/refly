/* @flow */
import Koa from 'koa'
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { readFileSync } from 'fs'
import { createServerRenderContext, ServerRouter } from 'react-router'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'
import serialize from 'serialize-javascript'

import App from '../browser/routes/App'
import Html from './Html'
import configureStore from '../common/store/configureStore'
import { setInitialNow, setAvailableLocales } from '../common/reducers/runtime/actions'
import { setLocale } from '../common/reducers/intl/actions'
import { locales } from '../common/config'

const assets = JSON.parse(readFileSync(`${__dirname}/assets.json`, 'utf-8'))

const renderBody = (store, context, location) => {
  const markup = renderToString(
    <Provider store={store}>
      <ServerRouter
        context={context}
        location={location}
      >
        <App />
      </ServerRouter>
    </Provider>,
  )
  return { markup, helmet: Helmet.rewind() }
}

const renderScripts = (state, appJsFilename) =>
`
  <script>
    window.__INITIAL_STATE__ = ${serialize(state)};
  </script>
  <script src="${appJsFilename}"></script>
`

const renderHtml = (state, locale, bodyMarkupWithHelmet) => {
  const { markup: bodyMarkup, helmet } = bodyMarkupWithHelmet
  const scriptsMarkup = renderScripts(state, assets.main.js)
  const markup = renderToStaticMarkup(
    <Html
      appCssFilename={assets.main.css}
      locale={locale}
      bodyHtml={`<div id="app">${bodyMarkup}</div>${scriptsMarkup}`}
      helmet={helmet}
    />
  )
  return `<!DOCTYPE html>${markup}`
}

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

      const context = createServerRenderContext()
      const result = context.getResult()

      if (result.redirect) {
        ctx.redirect(result.redirect.pathname + result.redirect.search)
        return
      }

      if (result.missed) {
        ctx.status = 404
        return
      }

      const bodyMarkupWithHelmet = renderBody(store, context, ctx.url)
      const htmlMarkup = renderHtml(store.getState(), locale, bodyMarkupWithHelmet)

      ctx.body = htmlMarkup
    } catch (err) {
      next(err)
    }
  }
}

export { render }
