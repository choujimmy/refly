/* @flow */
import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import style from './style.scss'

class Header extends Component {
  static propTypes = {
  }

  render () {
    return (
      <header styleName='header'>
      header
      </header>
    )
  }
}

export default CSSModules(Header, style)
