/* @flow */
import React, { Component, PropTypes } from 'react'
import { fontFace, style, before } from 'next/css'

const styles = {
  icon: {
    fontFamily: fontFace({
      fontFamily: 'iconfont',
      src: [
        'url("/static/fonts/iconfont.eot")',
        'url("/static/fonts/iconfont.eot") format("embedded-opentype")',
        'url("/static/fonts/iconfont.woff") format("woff")',
        'url("/static/fonts/iconfont.svg") format("svg")'
      ]
    }),
    fontSize: '16px',
    fontStyle: 'normal',
    WebkitFontSmoothing: 'antialiased',
    WebkitTextStrokeWidth: '0.2px',
    MozOsxFontSmoothing: 'grayscale'
  }
}

const iconNameMap = {
  search: before({
    content: '"\\e65c"'
  })
}

export default class Icon extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired
  }

  render () {
    return (
      <i className={`${style(styles.icon)} ${iconNameMap[this.props.name]}`} />
    )
  }
}
