/* @flow */
import React, { Component, PropTypes } from 'react'
import { style } from 'glamor'
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
  },

  logo: {
    fontSize: '1em',
    width: '200px',
    color: '#007fff'
  },

  slogan: {
    flex: 1
  }
}

class Header extends Component {
  static propTypes = {
    styles: PropTypes.object,
    user: PropTypes.object
  }

  render () {
    const { user } = this.props
    return (
      <header className={style(styles.header)}>
        <div className={style(styles.wrapper)}>
          <a className={style(styles.logo)}>LOGO</a>
          <span className={style(styles.slogan)}>Slogan</span>
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
