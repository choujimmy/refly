/* @flow */
import React, { Component, PropTypes } from 'react'
import classNames from 'classname'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import style from './col.scss'

const colSizes = ['xs', 'sm', 'md', 'lg', 'xl']
const stringOrNumberProp = PropTypes.oneOfType([PropTypes.number, PropTypes.string])

const columnProps = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.number,
  PropTypes.string,
  PropTypes.shape({
    size: stringOrNumberProp,
    push: stringOrNumberProp,
    pull: stringOrNumberProp,
    offset: stringOrNumberProp
  })
])

class Col extends Component {
  static propTypes = {
    xs: columnProps,
    sm: columnProps,
    md: columnProps,
    lg: columnProps,
    xl: columnProps,
    className: PropTypes.string
  }

  static defaultProps = {
    xs: 12
  }

  render () {
    const {
      className,
      ...attributes
    } = this.props

    const colClasses = []

    colSizes.forEach(colSize => {
      const columnProp = this.props[colSize]
      delete attributes[colSize]
      let colClass

      if (!columnProp) {
        return
      } else if (columnProp.size) {
        if (columnProp.size === 'auto') {
          colClass = style[`col-${colSize}`]
        } else {
          colClass = style[`col-${colSize}-${columnProp.size}`]
        }

        colClasses.push(classNames({
          [colClass]: columnProp.size,
          [style[`push-${colSize}-${columnProp.push}`]]: columnProp.push,
          [style[`pull-${colSize}-${columnProp.pull}`]]: columnProp.pull,
          [style[`offset-${colSize}-${columnProp.offset}`]]: columnProp.offset
        }))
      } else {
        if (columnProp === 'auto' || columnProp === true) {
          colClass = style[`col-${colSize}`]
        } else {
          colClass = style[`col-${colSize}-${columnProp}`]
        }

        colClasses.push(colClass)
      }
    })

    const classes = classNames(
      className,
      colClasses
    )

    return (
      <div {...attributes} className={classes} />
    )
  }
}

export default withStyles(style)(Col)
