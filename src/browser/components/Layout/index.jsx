import React, { Component, PropTypes } from 'react'
import Header from '../Header'

class Layout extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export default Layout
