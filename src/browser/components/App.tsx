import * as React from 'react'

interface AppProps extends React.Props<App> {
  insertCss: Function,
  store: any
}

class App extends React.Component<AppProps, {}> {

  private static childContextTypes: React.ValidationMap<any> = {
    insertCss: React.PropTypes.func,
    store: React.PropTypes.any
  }

  public getChildContext(): AppProps {
    return {
      insertCss: this.props.insertCss,
      store: this.props.store
    }
  }

  public render(): React.ReactElement<{}> {
    return React.Children.only(this.props.children)
  }
}

export default App
