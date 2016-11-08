/* @flow */
import React from 'react'
import Home from './Home'
import { Page } from '../type'

export default {

  path: '/',

  async action (): Page {
    return {
      title: 'React Starter Kit',
      component: <Home title='test' />
    }
  }
}
