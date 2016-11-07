import * as UniversalRouter from 'universal-router'

import { Page, Context } from './context'
import homeRoute from './home'
import notFoundRoute from './notFound'

const route: UniversalRouter.Route<Context, Page> = {

  path: '/',

  children: [
    homeRoute,
    notFoundRoute
  ],

  async action ({ next }: Context) {
    let route: Page

    do {
      route = await next()
    } while (!route)

    route.title = `${route.title || 'Untitled Page'} - refly`
    route.description = route.description || ''

    return route
  }

}

export default route
