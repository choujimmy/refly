/* @flow */
import { Page, Context } from './type'

export default {

  path: '/',

  children: [
    require('./home').default,
    require('./notFound').default
  ],

  async action ({ next }: Context): Page {
    let route

    do {
      route = await next()
    } while (!route)

    route.title = `${route.title || 'Untitled Page'} - www.reactstarterkit.com`
    route.description = route.description || ''

    return route
  }

}
