/* @flow */
import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import style from './style.scss'
import Container from '../Container'
import Badge from '../Badge'

class Header extends Component {
  static propTypes = {
  }

  render () {
    return (
      <div>
        <Container><Badge>测试</Badge></Container>
      </div>
    )
  }
}

export default withStyles(style)(Header)
