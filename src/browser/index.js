/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import { rehydrate } from 'glamor'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import UniversalRouter from 'universal-router'
import queryString from 'query-string'

import App from './components/App'
import history from './utils/history'
import { ErrorReporter, deepForceUpdate } from './utils/dev'

rehydrate(window.__STYLE_IDS__)

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
})

const client = new ApolloClient({
  networkInterface,
  initialState: window.__STORE_STATE__
})

const scrollPositionsHistory = {}
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

const onRenderComplete = (route, location) => {
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

  // 从保存的历史中恢复页面滚动位置
  window.scrollTo(scrollX, scrollY)
}

const container = document.getElementById('app')
let appInstance
let currentLocation = (history:any).location
let routes = require('./routes').default

// 当浏览器location发生改变时重新渲染
const onLocationChange = async (location) => {
  // 记住前一个页面的滚动位置
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset
  }
  if ((history:any).action === 'PUSH') {
    delete scrollPositionsHistory[location.key]
  }
  currentLocation = location

  try {
    const route = await UniversalRouter.resolve(routes, {
      path: location.pathname,
      query: queryString.parse(location.search)
    })

    if (currentLocation.key !== location.key) {
      return
    }

    if (route.redirect) {
      (history:any).replace(route.redirect)
      return
    }

    appInstance = ReactDOM.render(
      <ApolloProvider client={client}>
        <App>{route.component}</App>
      </ApolloProvider>,
      container,
      () => onRenderComplete(route, location),
    )
  } catch (error) {
    console.error(error)

    if (currentLocation.key !== location.key) {
      return
    }

    // 开发模式显示全屏错误信息
    if (process.env.NODE_ENV !== 'production') {
      appInstance = null
      document.title = `错误: ${error.message}`
      ReactDOM.render(<ErrorReporter error={error} />, container)
      return
    }

    window.location.reload()
  }
}

(history:any).listen(onLocationChange)
onLocationChange(currentLocation)

// 开启HMR功能
if (module.hot) {
  (module.hot:any).accept('./routes', () => {
    routes = require('./routes').default

    if (appInstance) {
      try {
        // 强制更新整个react组件树
        deepForceUpdate(appInstance)
      } catch (error) {
        appInstance = null
        document.title = `热更新错误: ${error.message}`
        ReactDOM.render(<ErrorReporter error={error} />, container)
        return
      }
    }

    onLocationChange(currentLocation)
  })
}
