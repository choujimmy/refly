/* @flow */
import React, { Component, PropTypes } from 'react'
import classNames from 'classname'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import style from './row.scss'

class Row extends Component {
  static propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    className: PropTypes.string
  }

  static defaultProps = {
    tag: 'div'
  }

  render () {
    const {
      className,
      tag: Tag,
      ...attributes
    } = this.props

    const classes = classNames(
      className,
      style['row']
    )

    return (
      <Tag {...attributes} className={classes} />
    )
  }
}

export default withStyles(style)(Row)
