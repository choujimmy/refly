import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import style from './style.scss'

class Icon extends Component {
  static propTypes = {
    name: PropTypes.string
  }

  render () {
    const { name, ...props } = this.props
    return (
      <i styleName={`icon icon-${name}`} {...props} />
    )
  }
}

export default CSSModules(Icon, style, {
  errorWhenNotFound: false,
  allowMultiple: true
})
