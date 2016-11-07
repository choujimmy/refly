import * as React from 'react'
import * as UniversalRouter from 'universal-router'
import Home from './Home'
import { Page, Context } from '../context'

const route: UniversalRouter.Route<Context, Page> = {

  path: '/',

  async action () {
    return {
      title: 'Home',
      component: <Home />
    }
  }
}

export default route
