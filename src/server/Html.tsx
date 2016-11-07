import * as React from 'react'
import * as serialize from 'serialize-javascript'

interface HtmlProps extends React.Props<any> {
  title: string
  description: string
  style?: string
  script?: string
  chunk?: string
  state?: any,
  children?: string
}

class Html extends React.Component<HtmlProps, any> {
  public render() {
    const { title, description, style, state, script, chunk, children } = this.props
    return (
      <html className='no-js' lang='en-US'>
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <title>{title}</title>
          <meta name='description' content={description} />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='apple-touch-icon' href='apple-touch-icon.png' />
          <style id='css' dangerouslySetInnerHTML={{ __html: style }} />
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={{ __html: children }} />
          {state && (
            <script
              dangerouslySetInnerHTML={{ __html:
              `window.APP_STATE=${serialize(state, { isJSON: true })}` }}
            />
          )}
          {script && <script src={script} />}
          {chunk && <script src={chunk} />}
        </body>
      </html>
    )
  }
}

export default Html
