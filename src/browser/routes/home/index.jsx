/* @flow */
import React from 'react'
import CSSModules from 'react-css-modules'
import style from './style.scss'

class Home extends React.Component {

  render () {
    return (
      <div>home</div>
    )
  }
}

export default CSSModules(Home, style)
