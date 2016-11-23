/* @flow */
import React, { Component } from 'react'
import { style } from 'next/css'
import Head from 'next/head'

import Search from './Search'

const styles = {
  header: {
    borderBottom: '1px solid #f1f1f1',
    backgroundColor: '#fff'
  },

  wrapper: {
    margin: '0 auto',
    width: '1000px',
    height: '4em',
    display: 'flex',
    alignItems: 'center'
  },

  logo: {
    fontSize: '1em',
    width: '200px',
    color: '#007fff'
  },

  slogan: {
    flex: 1
  }
}

export default class Header extends Component {

  static propTypes = {}

  render () {
    return (
      <header className={style(styles.header)}>
        <Head>
          <link rel='stylesheet' href='/static/styles/normalize.css' />
        </Head>
        <div className={style(styles.wrapper)}>
          <a className={style(styles.logo)}>LOGO</a>
          <span className={style(styles.slogan)}>Slogan</span>
          <Search />
        </div>
      </header>
    )
  }
}
