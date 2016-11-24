/* @flow */
import React, { Component, PropTypes } from 'react'
import { fontFace, style, before } from 'glamor'

const styles = {
  icon: {
    fontFamily: fontFace({
      fontFamily: 'iconfont',
      src: [
        `url('${require('./iconfont.eot')}')`,
        `url('${require('./iconfont.eot')}') format('embedded-opentype')`,
        `url('${require('./iconfont.woff')}') format('woff')`,
        `url('${require('./iconfont.svg')}') format('svg')`
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

class Icon extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired
  }

  render () {
    return (
      <i className={`${style(styles.icon)} ${iconNameMap[this.props.name]}`} />
    )
  }
}

export default Icon
