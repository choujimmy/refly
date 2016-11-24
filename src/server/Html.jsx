/* @flow */
import React, { PropTypes, Component } from 'react'

export default class Html extends Component {

  static propTypes = {
    appCssFilename: PropTypes.string,
    appStyles: PropTypes.string,
    bodyHtml: PropTypes.string.isRequired,
    helmet: PropTypes.object.isRequired
  }

  render () {
    const { appCssFilename, appStyles, bodyHtml, helmet } = this.props
    return (
      <html {...helmet.htmlAttributes.toComponent()}>
        <head>
          {helmet.title.toComponent()}
          {helmet.base.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {helmet.script.toComponent()}
          {appCssFilename &&
            <link href={appCssFilename} rel='stylesheet' />
          }
          {appStyles &&
            <style>${appStyles}</style>
          }
        </head>
        <body
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </html>
    )
  }
}
