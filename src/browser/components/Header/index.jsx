/* @flow */
import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import style from './style.scss'

class Header extends Component {
  static propTypes = {
  }

  render () {
    return (
      <header className={style['header']}>
      header
      </header>
    )
  }
}

export default withStyles(style)(Header)
