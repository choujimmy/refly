/* @flow */
import React, { Component, PropTypes } from 'react'
import classNames from 'classname'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import style from './style.scss'
import Row from './Row'
import Col from './Col'

class Grid extends Component {
  static Row = Row
  static Col = Col

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

export default withStyles(style)(Grid)
