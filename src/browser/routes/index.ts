import * as UniversalRouter from 'universal-router'

import { Page, AppContext } from './context'
import HomeRoute from './home'
import NotFoundRoute from './notFound'

class RootRoute implements UniversalRouter.Route<AppContext, Page> {

  path: '/'

  children: [
    HomeRoute,
    NotFoundRoute
  ]

  async action ({ next }: AppContext) {
    let route: Page

    do {
      route = await next()
    } while (!route)

    route.title = `${route.title || 'Untitled Page'} - refly`
    route.description = route.description || ''

    return route
  }

}

const route = new RootRoute()

export default route
