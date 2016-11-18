/* @flow */
import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import style from './style.scss'

class Login extends Component {

  render () {
    return (
      <div>login</div>
    )
  }
}

Login = CSSModules(Login, style)

export default Login
