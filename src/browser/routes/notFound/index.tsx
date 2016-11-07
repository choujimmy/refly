import * as React from 'react'
import * as UniversalRouter from 'universal-router'
import { Page, AppContext } from '../context'
import NotFound from './NotFound'

export default class NotFoundRoute implements UniversalRouter.Route<AppContext, Page> {

  path: '*'

  action () {
    return {
      title: '404',
      component: <NotFound />,
      status: 404
    }
  }
}
