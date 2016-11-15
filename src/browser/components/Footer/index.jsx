/* @flow */
import React from 'react'
import CSSModules from 'react-css-modules'
import style from './style.scss'

class Footer extends React.Component {
  static propTypes = {
  }

  render () {
    return (
      <div>footer</div>
    )
  }
}

export default CSSModules(Footer, style)
