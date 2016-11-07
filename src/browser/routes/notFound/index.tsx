import * as React from 'react'
import * as UniversalRouter from 'universal-router'
import { Page, Context } from '../context'
import NotFound from './NotFound'

const route: UniversalRouter.Route<Context, Page> = {

  path: '*',

  action () {
    return {
      title: '404',
      component: <NotFound />,
      status: 404
    }
  }
}

export default route
