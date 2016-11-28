/* @flow */
import React, { Component } from 'react'
import { Link } from 'react-router'
import { style } from 'glamor'
import gql from 'graphql-tag'
import { propType } from 'graphql-anywhere'

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

const logoPartFragment = gql`
  fragment LogoPart on Site {
    logoUrl,
    slogan
  }
`

class Logo extends Component {

  static fragments = {
    site: logoPartFragment
  }

  static propTypes = {
    site: propType(Logo.fragments.site).isRequired
  }

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
