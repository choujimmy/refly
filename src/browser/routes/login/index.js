/* @flow */
import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../../components/Layout'
import Login from './Login'

export default {
  path: '/login',

  async action () {
    return {
      component: (
        <Layout>
          <Helmet
            title='Login' />
          <Login />
        </Layout>
      )
    }
  }
}
