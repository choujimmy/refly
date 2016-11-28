/* @flow */
import React, { Component, PropTypes } from 'react'
import { style } from 'glamor'
import Logo from './Logo'
import NotLogin from './NotLogin'
import Search from './Search'

const styles = {
  header: {
    borderBottom: '1px solid #f1f1f1',
    backgroundColor: '#fff'
  },

  wrapper: {
    margin: '0 auto',
    width: '1000px',
    height: '4em',
    display: 'flex',
    alignItems: 'center'
  }
}

class Header extends Component {
  static propTypes = {
    styles: PropTypes.object,
    user: PropTypes.object
  }

  render () {
    const { user } = this.props
    console.log('render header')
    return (
      <header className={style(styles.header)}>
        <div className={style(styles.wrapper)}>
          <Logo />
          <Search />
          {(!user || !user.me) &&
            <NotLogin />
          }
        </div>
      </header>
    )
  }
}

export default Header
