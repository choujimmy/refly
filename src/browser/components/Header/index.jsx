/* @flow */
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import style from './style.scss'
import Icon from '../Icon'
import NotLogin from './NotLogin'

const messages = defineMessages({
  placeholder: {
    id: 'header.search_placeholder',
    defaultMessage: 'Keyword',
    description: '页眉全局搜索提示文本'
  }
})

class Header extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    styles: PropTypes.object,
    user: PropTypes.object
  }

  render () {
    const { user, intl } = this.props
    return (
      <header styleName='header'>
        <div styleName='wrap'>
          <a styleName='logo'>LOGO</a>
          <span styleName='slogan'>Slogan</span>
          <div styleName='search-container'>
            <Icon name='search' className={this.props.styles['search-icon']} />
            <input type='text' placeholder={intl.formatMessage(messages.placeholder)} styleName='search-input' />
          </div>
          {(!user || !user.has('me')) &&
            <NotLogin />
          }
        </div>
      </header>
    )
  }
}

Header = CSSModules(Header, style)

Header = injectIntl(Header)

Header = connect((state) => ({
  user: state.get('user')
}))(Header)

export default Header
