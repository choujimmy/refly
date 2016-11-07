import * as React from 'react'
import * as UniversalRouter from 'universal-router'
import Home from './Home'
import { Page, Context } from '../context'

const route: UniversalRouter.Route<Context, Page> = {

  path: '/',

  async action (): Promise<Page> {
    return {
      title: 'Home',
      component: <Home />,
      description: 'description'
    }
  }
}

export default route
