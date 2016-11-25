import App from './routes/App'
import React, { PropTypes, Component } from 'react'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )
  }
}
