/* @flow */
import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import style from './style.scss'

class Home extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render () {
    return (
      <div />
    )
  }
}

export default CSSModules(Home, style)
