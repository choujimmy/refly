import * as React from 'react'

interface NotFoundProps extends React.Props<any> {
}

class NotFound extends React.Component<NotFoundProps, any> {
  public render() {
    return (
      <div>
        <h4>404</h4>
      </div>
    )
  }
}

export default NotFound
