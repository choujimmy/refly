/* @flow */
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import style from './style.scss'
import Icon from '../Icon'
import NotLogin from './NotLogin'

class Header extends Component {
  static propTypes = {
    styles: PropTypes.object,
    user: PropTypes.object
  }

  render () {
    const { user } = this.props
    return (
      <header styleName='header'>
        <div styleName='wrap'>
          <a styleName='logo'>LOGO</a>
          <span styleName='slogan'>Slogan</span>
          <div styleName='search-container'>
            <Icon name='search' className={this.props.styles['search-icon']} />
            <input type='text' placeholder='请输入关键字搜索' styleName='search-input' />
          </div>
          {!user &&
            <NotLogin />
          }
        </div>
      </header>
    )
  }
}

Header = CSSModules(Header, style)

Header = connect((state) => ({
  user: state.user
}))(Header)

export default Header
