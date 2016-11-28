/* @flow */
import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../../components/Layout'
import Home from './Home'

export default {
  path: '/',

  async action () {
    return {
      component: (
        <Layout>
          <Helmet
            title='Refly' />
          <Home />
        </Layout>
      )
    }
  }
}
