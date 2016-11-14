/* @flow */
import React, { Component, PropTypes } from 'react'
import classNames from 'classname'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import style from './style.scss'

class Container extends Component {
  static propTypes = {
    fluid: PropTypes.bool,
    className: PropTypes.string
  }

  static defaultProps = {
  }

  render () {
    const {
      className,
      fluid,
      ...attributes
    } = this.props

    const classes = classNames(
      className,
      fluid ? style['container-fluid'] : style['container']
    )

    return (
      <div {...attributes} className={classes} />
    )
  }
}

export default withStyles(style)(Container)
