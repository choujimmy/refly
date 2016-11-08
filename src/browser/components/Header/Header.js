/* @flow */
import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import style from './Header.scss'

class Header extends Component {
  static propTypes = {
  }

  render () {
    return (
      <div className={style.container}>
        <div className={style.wrapper}>
        header
        </div>
      </div>
    )
  }
}

export default withStyles(style)(Header)
