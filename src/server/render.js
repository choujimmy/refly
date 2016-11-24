/* @flow */
import Koa from 'koa'
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { readFileSync } from 'fs'
import { createServerRenderContext, ServerRouter } from 'react-router'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'

import App from '../browser/routes/App'
import Html from './Html'
import configureStore from '../common/store/configureStore'
import { setInitialNow } from '../common/reducers/runtime/actions'

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
    window.__INITIAL_STATE__ = ${JSON.stringify(state)};
  </script>
  <script src="${appJsFilename}"></script>
`

const renderHtml = (state, bodyMarkupWithHelmet) => {
  const { markup: bodyMarkup, helmet } = bodyMarkupWithHelmet
  const scriptsMarkup = renderScripts(state, assets.main.js)
  const markup = renderToStaticMarkup(
    <Html
      appCssFilename={assets.main.css}
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
      })

      store.dispatch(setInitialNow(Date.now()))

      const context = createServerRenderContext()
      const result = context.getResult()

      if (result.redirect) {
        ctx.redirect(result.redirect.pathname + result.redirect.search)
        return
      }

      if (result.missed) {
        ctx.status = 404
      }

      const bodyMarkupWithHelmet = renderBody(store, context, ctx.originalUrl)
      const htmlMarkup = renderHtml(store.getState(), bodyMarkupWithHelmet)
      ctx.body = htmlMarkup
    } catch (err) {
      console.log('服务端渲染错误:', err)
      next(err)
    }
  }
}

export { render }
