/* @flow */
import Koa from 'koa'
import React from 'react'
import colors from 'colors'
import serialize from 'serialize-javascript'
import { renderStatic } from 'glamor/server'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { getDataFromTree } from 'react-apollo/server'
import { readFileSync } from 'fs'
import { createServerRenderContext, ServerRouter } from 'react-router'
import Helmet from 'react-helmet'

import App from '../browser/routes/App'
import Html from './Html'

const assets = JSON.parse(readFileSync(`${__dirname}/assets.json`, 'utf-8'))
const vendorManifest = JSON.parse(readFileSync(`${__dirname}/public/vendor/manifest.json`, 'utf-8'))

const renderBody = async (client, context, location) => {
  const app = (
    <ApolloProvider client={client}>
      <ServerRouter
        context={context}
        location={location}
      >
        <App />
      </ServerRouter>
    </ApolloProvider>
  )
  await getDataFromTree(app)
  const state = client.store.getState()[client.reduxRootKey].data
  const { html: htmlWithStyle, css, ids } = renderStatic(() => {
    return renderToString(app)
  })
  return {
    css,
    ids,
    state,
    html: htmlWithStyle,
    helmet: Helmet.rewind()
  }
}

const renderScripts = (state, appJsFilename, ids) =>
`
  <script>
    window.__STYLE_IDS__ = ${serialize(ids, { isJSON: true })};
    window.__STORE_STATE__ = ${serialize(state, { isJSON: true })};
  </script>
  <script src="/vendor/${vendorManifest.name}.js"></script>
  <script src="${appJsFilename}"></script>
`

const renderHtml = ({ css, ids, state, html, helmet }) => {
  const scriptsMarkup = renderScripts(state, assets.main.js, ids)
  const markup = renderToStaticMarkup(
    <Html
      appCssFilename={assets.main.css}
      appStyles={css}
      bodyHtml={`<div id="app">${html}</div>${scriptsMarkup}`}
      helmet={helmet}
    />
  )
  return `<!DOCTYPE html>${markup}`
}

const render = () => {
  return async (ctx: Koa.context, next: Function) => {
    try {
      const client = new ApolloClient({
        ssrMode: true,
        networkInterface: createNetworkInterface({
          uri: '/graphql',
          credentials: 'same-origin',
          headers: ctx.headers
        })
      })

      const context = createServerRenderContext()
      const result = context.getResult()

      if (result.redirect) {
        ctx.redirect(result.redirect.pathname + result.redirect.search)
        return
      }

      if (result.missed) {
        ctx.status = 404
      }

      const bodyMarkupWithHelmet = await renderBody(client, context, ctx.originalUrl)
      const htmlMarkup = renderHtml(bodyMarkupWithHelmet)
      ctx.body = htmlMarkup
    } catch (err) {
      console.log(colors.yellow(`服务端渲染错误: ${err}`))
      next(err)
    }
  }
}

export { render }
