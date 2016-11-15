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
      <header className={style['header']}>
        <Grid>
          <Grid.Row className={style['row']}>
            <Grid.Col md={{size: 2}}>
              <a>Logo</a>
            </Grid.Col>
            <Grid.Col md={{size: 'auto'}}>
              <span>slogan</span>
            </Grid.Col>
            <Grid.Col md={{size: 2}}>
              输入框
            </Grid.Col>
            <Grid.Col md={{size: 2}}>
              登录
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </header>
    )
  }
}

export default withStyles(style)(Header)
