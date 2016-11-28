/* @flow */
import React, { Component } from 'react'
import { style } from 'glamor'
import { Link } from 'react-router'

const styles = {
  container: {
    display: 'flex',
    flex: 1
  },

  logo: {
    fontSize: '1em',
    width: '200px',
    color: '#007fff',
    textDecoration: 'none'
  },

  slogan: {
    flex: 1
  }
}

class Logo extends Component {

  render () {
    return (
      <div className={style(styles.container)}>
        <Link to='/' className={`${style(styles.logo)}`}>LOGO</Link>
        <span className={style(styles.slogan)}>Slogan</span>
      </div>
    )
  }
}

export default Logo
