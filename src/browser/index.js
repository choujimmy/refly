/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import { rehydrate } from 'glamor'
import ApolloClient from 'apollo-client'

import Root from './Root'

rehydrate(window.__STYLE_IDS__)
const client = new ApolloClient({
  initialState: window.__STORE_STATE__
})
const container = document.getElementById('app')

ReactDOM.render(
  <Root client={client} />
, container)

// 启用Hot Module Replacement (HMR)
if (module.hot) {
  (module.hot:any).accept('./Root', () => {
    const NextRoot = require('./Root').default
    ReactDOM.render(
      <NextRoot client={client} />
    , container)
  })
}
