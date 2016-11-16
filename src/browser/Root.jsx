import App from './routes/App'
import React, { PropTypes } from 'react'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'

export default class Root extends React.Component {
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
