/* @flow */
import React, { Component, PropTypes } from 'react'
import classNames from 'classname'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import style from './style.scss'

class Badge extends Component {
  static propTypes = {
    color: PropTypes.string,
    pill: PropTypes.bool,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    children: PropTypes.node,
    className: PropTypes.string
  }

  static defaultProps = {
    color: 'default',
    pill: false,
    tag: 'span'
  }

  render () {
    const {
      className,
      color,
      pill,
      tag: Component,
      ...attributes
    } = this.props

    const classes = classNames(
      className,
      style['badge'],
      style[`badge-${color}`],
      pill ? style['badge-pill'] : false
    )
    return (
      <Component {...attributes} className={classes} />
    )
  }
}

export default withStyles(style)(Badge)
