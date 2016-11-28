import React, { Component, PropTypes } from 'react'
import history from '../../utils/history'

const isLeftClickEvent = (event) => {
  return event.button === 0
}

const isModifiedEvent = (event) => {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

class Link extends Component {

  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node,
    onClick: PropTypes.func
  }

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event)
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return
    }

    if (event.defaultPrevented === true) {
      return
    }

    event.preventDefault()
    history.push(this.props.to)
  }

  render () {
    const { to, children, ...props } = this.props
    return <a href={to} {...props} onClick={this.handleClick}>{children}</a>
  }
}

export default Link
