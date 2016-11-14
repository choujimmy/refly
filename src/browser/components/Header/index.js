/* @flow */
import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import style from './style.scss'
import Grid from '../Grid'

class Header extends Component {
  static propTypes = {
  }

  render () {
    return (
      <div>
        <Grid><Grid.Row>测试</Grid.Row></Grid>
      </div>
    )
  }
}

export default withStyles(style)(Header)
