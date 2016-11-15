/* @flow */
import React, { PropTypes } from 'react'
import serialize from 'serialize-javascript'

export default class Html extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    style: PropTypes.string,
    script: PropTypes.string,
    chunk: PropTypes.string,
    state: PropTypes.object,
    lang: PropTypes.string,
    children: PropTypes.string
  }

  render () {
    const { title, description, style, script, chunk, state, lang, children } = this.props
    return (
      <html className='no-js' lang={lang}>
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <title>{title}</title>
          <meta name='description' content={description} />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='apple-touch-icon' href='apple-touch-icon.png' />
          {style &&
            <link
              href={style}
              media='screen, projection'
              rel='stylesheet' type='text/css' charSet='UTF-8' />
          }
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={{ __html: children }} />
          {state && (
            <script
              dangerouslySetInnerHTML={{ __html:
              `window.__INITIAL_STATE__=${serialize(state, { isJSON: true })}` }}
            />
          )}
          {script && <script src={script} />}
          {chunk && <script src={chunk} />}
        </body>
      </html>
    )
  }
}
