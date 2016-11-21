/* @flow */
import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import style from './NotLogin.scss'

class NotLogin extends Component {

  static propTypes = {}

  render () {
    return (
      <div styleName='container'>
        <Link to='/register'>注册</Link>
        <span>·</span>
        <Link to='/login'>登录</Link>
      </div>
    )
  }
}

NotLogin = CSSModules(NotLogin, style)

export default NotLogin
