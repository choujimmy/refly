/* @flow */
import React, { PropTypes } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Layout from '../../components/Layout'
import style from './Home.scss'

class Home extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render () {
    const { title } = this.props
    return (
      <Layout full={false}>
        <div />
      </Layout>
    )
  }
}

export default withStyles(style)(Home)
