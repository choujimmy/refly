/* @flow */
import 'normalize.css'
import { PureComponent, PropTypes, Children } from 'react'

class App extends PureComponent {

  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render () {
    return Children.only(this.props.children)
  }
}

export default App
