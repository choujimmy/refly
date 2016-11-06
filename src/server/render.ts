import * as Koa from 'koa'

import configureStore from '../common/configureStore'
import { setVariable } from '../common/actions/runtime'

const render = () => {
  return async (ctx: Koa.Context, next: any) => {
    try {
      const store = configureStore(
        {
          user: (ctx as any).session.user || null
        },
        {
          cookie: ctx.headers['cookie']
        }
      )

      store.dispatch(setVariable('initialNow',Date.now()))

    } catch (err) {
      console.log('服务端渲染错误', err)
      next(err)
    }
  }
}

export default render
