/* @flow */
import React, { PropTypes, Children } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import style from './Layout.scss'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render () {
    return (
      <div>
        <Header />
        {Children.only(this.props.children)}
        <Footer />
      </div>
    )
  }
}

export default withStyles(style)(Layout)
