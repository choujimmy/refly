import * as React from 'react'
import * as UniversalRouter from 'universal-router'
import Home from './Home'
import { Page, AppContext } from '../context'

export default class HomeRoute implements UniversalRouter.Route<AppContext, Page> {

  path: '/'

  async action () {
    return {
      title: 'Home',
      component: <Home />
    }
  }
}
