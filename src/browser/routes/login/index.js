/* @flow */
import React from 'react'
import Layout from '../../components/Layout'
import Login from './Login'

export default {
  path: '/login',

  async action () {
    return {
      component: (
        <Layout>
          <Login />
        </Layout>
      )
    }
  }
}
