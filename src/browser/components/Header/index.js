/* @flow */
import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import style from './style.scss'
import Container from '../Container'

class Header extends Component {
  static propTypes = {
  }

  render () {
    return (
      <div>
        <Container>1</Container>
      </div>
    )
  }
}

export default withStyles(style)(Header)
