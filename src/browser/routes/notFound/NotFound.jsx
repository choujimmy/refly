/* @flow */
import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import style from './style.scss'

class NotFound extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render () {
    const { title } = this.props
    return (
      <div styleName='container'>
        <h1>{title}</h1>
        <p>Sorry, the page you were trying to view does not exist.</p>
      </div>
    )
  }
}

export default CSSModules(NotFound, style)
