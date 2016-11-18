/* @flow */
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import style from './style.scss'
import Icon from '../Icon'

class Header extends Component {
  static propTypes = {
    styles: PropTypes.object
  }

  render () {
    return (
      <header styleName='header'>
        <div styleName='wrap'>
          <a styleName='logo'>LOGO</a>
          <span styleName='slogan'>Slogan</span>
          <div styleName='search-container'>
            <Icon name='search' className={this.props.styles['search-icon']} />
            <input type='text' placeholder='请输入关键字搜索' styleName='search-input' />
          </div>
        </div>
      </header>
    )
  }
}

export default CSSModules(Header, style)
