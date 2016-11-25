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
          <meta charSet='utf-8' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='apple-touch-icon-precomposed' sizes='57x57' href='/apple-touch-icon-57x57.png' />
          <link rel='apple-touch-icon-precomposed' sizes='114x114' href='/apple-touch-icon-114x114.png' />
          <link rel='apple-touch-icon-precomposed' sizes='72x72' href='/apple-touch-icon-72x72.png' />
          <link rel='apple-touch-icon-precomposed' sizes='144x144' href='/apple-touch-icon-144x144.png' />
          <link rel='apple-touch-icon-precomposed' sizes='120x120' href='/apple-touch-icon-120x120.png' />
          <link rel='apple-touch-icon-precomposed' sizes='152x152' href='/apple-touch-icon-152x152.png' />
          <link rel='icon' type='image/png' href='/favicon-32x32.png' sizes='32x32' />
          <meta name='application-name' content='Refly' />
          <meta name='msapplication-TileColor' content='#FFFFFF' />
          <meta name='msapplication-TileImage' content='/mstile-144x144.png' />
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
