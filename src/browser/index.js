/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import { rehydrate } from 'glamor'

import Root from './Root'
import configureStore from '../common/store/configureStore'

rehydrate(window.__STYLE_IDS__)
const store = configureStore(window.__STORE_STATE__)
const container = document.getElementById('app')

ReactDOM.render(
  <Root store={store} />
, container)

// 启用Hot Module Replacement (HMR)
if (module.hot) {
  (module.hot:any).accept('./Root', () => {
    const NextRoot = require('./Root').default
    ReactDOM.render(
      <NextRoot store={store} />
    , container)
  })
}
