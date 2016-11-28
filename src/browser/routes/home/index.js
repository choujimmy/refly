/* @flow */
import React from 'react'
import Layout from '../../components/Layout'
import Home from './Home'

export default {
  path: '/',

  async action () {
    return {
      component: (
        <Layout>
          <Home />
        </Layout>
      )
    }
  }
}
