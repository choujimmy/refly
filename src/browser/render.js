/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import createBrowserHistory from 'history/createBrowserHistory'

import Root from './Root'
import configureStore from '../common/store/configureStore'

[en, zh].forEach(addLocaleData)

const history = createBrowserHistory()
const store = configureStore(window.__INITIAL_STATE__, { history })

const container = document.getElementById('app')

const render = () => {
  // 初始化客户端渲染
  ReactDOM.render(
    <Root store={store} />
  , container)
}

// 启用Hot Module Replacement (HMR)
if (module.hot) {
  (module.hot:any).accept('./Root', () => {
    const NextRoot = require('./Root').default
    ReactDOM.render(
      <NextRoot store={store} />
    , container)
  })
}

export default render
