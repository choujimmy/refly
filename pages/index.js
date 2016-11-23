/* @flow */
import React, { Component } from 'react'
import Head from 'next/head'
import Header from '../components/Header'

export default class Index extends Component {

  static propTypes = {}

  render () {
    return (
      <div>
        <Header />
        <Head>
          <title>Refly</title>
        </Head>
      </div>
    )
  }
}
