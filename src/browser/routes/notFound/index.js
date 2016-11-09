/* @flow */
import React from 'react'
import NotFound from './NotFound'
import { Page } from '../../types/route.d'

const title = 'Page Not Found'

export default {

  path: '*',

  action (): Page {
    return {
      title,
      component: <NotFound title={title} />,
      status: 404
    }
  }

}
