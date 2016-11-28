/* @flow */
import React, { Component } from 'react'
import { style } from 'glamor'

import Link from '../Link'

const styles = {
  container: {
    paddingLeft: '1.5em'
  },

  link: {
    color: '#007fff',
    padding: '1.25em 0',
    fontSize: '0.9em',
    textDecoration: 'none',

    ':hover': {
      color: '#0371df'
    }
  },

  span: {
    padding: '0 0.25em',
    color: '#007fff'
  }
}

class NotLogin extends Component {

  static propTypes = {}

  render () {
    return (
      <div className={style(styles.container)}>
        <Link to='/register' className={`${style(styles.link)}`}>注册</Link>
        <span className={style(styles.span)}>·</span>
        <Link to='/login' className={`${style(styles.link)}`}>登录</Link>
      </div>
    )
  }
}

export default NotLogin
