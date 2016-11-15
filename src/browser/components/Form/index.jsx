/* @flow */
import React, { Component, PropTypes } from 'react'
import classNames from 'classname'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import style from './style.scss'

class Form extends Component {

  static propTypes = {
    children: PropTypes.node,
    inline: PropTypes.bool,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    getRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    className: PropTypes.string
  }

  static defaultProps = {
    tag: 'form'
  }

  render () {
    const {
      className,
      inline,
      tag: Tag,
      getRef,
      ...attributes
    } = this.props

    const classes = classNames(
      className,
      inline ? style['form-inline'] : false
    )

    return (
      <Tag {...attributes} ref={getRef} className={classes} />
    )
  }
}

export default withStyles(style)(Form)
