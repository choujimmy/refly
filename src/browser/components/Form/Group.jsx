/* @flow */
import React, { Component, PropTypes } from 'react'
import classNames from 'classname'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import style from './group.scss'

class Group extends Component {

  static propTypes = {
    children: PropTypes.node,
    row: PropTypes.bool,
    check: PropTypes.bool,
    disabled: PropTypes.bool,
    tag: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string
  }

  static defaultProps = {
    tag: 'div'
  }

  render () {
    const {
      className,
      row,
      disabled,
      color,
      check,
      tag: Tag,
      ...attributes
    } = this.props

    const classes = classNames(
      className,
      color ? style[`has-${color}`] : false,
      row ? style['row'] : false,
      check ? style['form-check'] : style['form-group'],
      check && disabled ? style['disabled'] : false
    )

    return (
      <Tag {...attributes} className={classes} />
    )
  }
}

export default withStyles(style)(Group)
