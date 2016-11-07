import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as UniversalRouter from 'universal-router'
import * as queryString from 'query-string'
import { createHistory } from 'history'

import { Page, Context } from './routes/context'
import { updateMeta } from './utils/meta'
import App from './components/App'
import configureStore from '../common/configureStore'

const history = createHistory()

const store = configureStore(
  (window as any).APP_STATE,
  { history }
)

const context = {
  insertCss: (...styles: any[]) => {
    const removeCss = styles.map(x => x._insertCss())
    return () => { removeCss.forEach(f => f()) }
  },
  store
}

const scrollPositionsHistory: {
  [name: string]: {
    scrollX: number,
    scrollY: number
  }
} = {}

if (window.history && 'scrollRestoration' in window.history) {
  (window.history as any).scrollRestoration = 'manual'
}

let onRenderComplete: Function = () => {
  const elem = document.getElementById('css')
  if (elem) {
    elem.parentNode.removeChild(elem)
  }
  onRenderComplete = (route: Page, location: HistoryModule.Location ) => {
    document.title = route.title

    updateMeta('description', route.description)
    // 更新其他需要的页面头部标签

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
}

const container = document.getElementById('app')
let currentLocation = history.getCurrentLocation()
let routes = require('./routes').default

// 当window.location变化的时候重新渲染
const onLocationChange = async (location: HistoryModule.Location) => {
  // 记住前一个页面的最后滚动位置
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset
  }

  if (location.action === 'PUSH') {
    delete scrollPositionsHistory[location.key]
  }
  currentLocation = location

  try {
    const route = await UniversalRouter.resolve<Context, Page>(
      routes,
      {
        insertCss: context.insertCss,
        store: context.store,
        path: location.pathname,
        query: queryString.parse(location.search)
      }
    )

    if (currentLocation.key !== location.key) {
      return
    }

    if (route.redirect) {
      history.replace(route.redirect)
      return
    }

    ReactDOM.render(
      (
        <App insertCss={context.insertCss} store={context.store}>
          {route.component}
        </App>
      ),
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
  currentLocation = history.getCurrentLocation()
  history.listen(onLocationChange)
  onLocationChange(currentLocation)
}

// 启用Hot Module Replacement (HMR)
if ((module as any).hot) {
  (module as any).hot.accept('./routes', () => {
    routes = require('./routes').default

    currentLocation = history.getCurrentLocation()
    onLocationChange(currentLocation)
  })
}

export default main
