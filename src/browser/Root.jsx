import App from './routes/App'
import React, { PropTypes, Component } from 'react'
import { BrowserRouter } from 'react-router'
import { ApolloProvider } from 'react-apollo'

export default class Root extends Component {
  static propTypes = {
    client: PropTypes.object
  }

  render () {
    return (
      <ApolloProvider client={this.props.client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}
