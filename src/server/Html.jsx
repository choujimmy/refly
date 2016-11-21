/* @flow */
import React, { PropTypes } from 'react'

export default class Html extends React.Component {

  static propTypes = {
    appCssFilename: PropTypes.string,
    bodyHtml: PropTypes.string.isRequired,
    helmet: PropTypes.object.isRequired
  }

  render () {
    const { appCssFilename, bodyHtml, helmet } = this.props
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
        </head>
        <body
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </html>
    )
  }
}
