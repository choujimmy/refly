/* @flow */
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import style from './Footer.scss'

class Footer extends React.Component {
  static propTypes = {
  }

  render () {
    return (
      <div>
        Footer
      </div>
    )
  }
}

export default withStyles(style)(Footer)
