/* @flow */
import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { defineMessages, FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import style from './NotLogin.scss'

const messages = defineMessages({
  login: {
    id: 'header.login',
    defaultMessage: 'Login',
    description: '页眉未登录状态登录链接文字'
  },
  register: {
    id: 'header.register',
    defaultMessage: 'Register',
    description: '页眉未登录状态注册链接文字'
  }
})

class NotLogin extends Component {

  static propTypes = {}

  render () {
    return (
      <div styleName='container'>
        <Link to='/register'>
          <FormattedMessage {...messages.register} />
        </Link>
        <span>·</span>
        <Link to='/login'>
          <FormattedMessage {...messages.login} />
        </Link>
      </div>
    )
  }
}

NotLogin = CSSModules(NotLogin, style)

export default NotLogin
