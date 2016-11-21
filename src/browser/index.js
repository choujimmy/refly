/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import Root from './Root'
import configureStore from '../common/store/configureStore'

const history = createBrowserHistory()
const store = configureStore(window.__INITIAL_STATE__, { history })

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
