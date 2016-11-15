/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import UniversalRouter from 'universal-router'
import queryString from 'query-string'
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import createBrowserHistory from 'history/createBrowserHistory'

import App from './components/App'
import configureStore from '../common/store/configureStore'
import { updateMeta } from './utils/meta'

[en, zh].forEach(addLocaleData)

const history = createBrowserHistory()
const store = configureStore(window.__INITIAL_STATE__, { history })
const context = {
  store
}

const scrollPositionsHistory = {}
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

const onRenderComplete = (route, location) => {
  document.title = route.title

  // 更新需要的页面头部标签
  updateMeta('description', route.description)

  let scrollX = 0
  let scrollY = 0
  const pos = scrollPositionsHistory[location.key]
  if (pos) {
    scrollX = pos.scrollX
    scrollY = pos.scrollY
  } else {
    const targetHash = location.hash.substr(1)
    if (targetHash) {
      const target = document.getElementById(targetHash)
      if (target) {
        scrollY = window.pageYOffset + target.getBoundingClientRect().top
      }
    }
  }

  // 恢复页面的滚动位置
  window.scrollTo(scrollX, scrollY)

  // 这里可以加入访问统计代码
}

const container = document.getElementById('app')
let currentLocation = history.location
let routes = require('./routes').default

// 当window.location变化的时候重新渲染
const onLocationChange = async (location) => {
  // 记住前一个页面的最后滚动位置
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset
  }

  if (history.action === 'PUSH') {
    delete scrollPositionsHistory[location.key]
  }
  currentLocation = location

  try {
    const route = await UniversalRouter.resolve(routes, {
      ...context,
      path: location.pathname,
      query: queryString.parse(location.search),
      locale: store.getState().intl.locale
    })

    if (currentLocation.key !== location.key) {
      return
    }

    if (route.redirect) {
      history.replace(route.redirect)
      return
    }

    ReactDOM.render(
      <App context={context}>{route.component}</App>,
      container,
      () => onRenderComplete(route, location)
    )
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      throw err
    }

    // 在产品模式中当页面重新加载遇到错误的时候消除错误的导航
    console.error(err)
    window.location.reload()
  }
}

const main = () => {
  currentLocation = history.location
  history.listen(onLocationChange)
  onLocationChange(currentLocation)
}

// 启用Hot Module Replacement (HMR)
if (module.hot) {
  (module.hot:any).accept('./routes', () => {
    routes = require('./routes').default

    currentLocation = history.location
    onLocationChange(currentLocation)
  })
}

export default main
