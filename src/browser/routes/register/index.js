/* @flow */
import React from 'react'
import Layout from '../../components/Layout'
import Register from './Register'

export default {
  path: '/register',

  async action () {
    return {
      component: (
        <Layout>
          <Register />
        </Layout>
      )
    }
  }
}
