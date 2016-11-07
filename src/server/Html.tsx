import * as React from 'react'

interface HtmlProps extends React.Props<any> {
  style?: string,
  bodyHtml: string,
  helmet: ReactHelmet.HelmetData
}

class Html extends React.Component<HtmlProps, any> {
  public render() {
    const { helmet, style, bodyHtml } = this.props
    return (
      <html {...helmet.htmlAttributes.toComponent()}>
        <head>
          {helmet.title.toComponent()}
          {helmet.base.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {helmet.script.toComponent()}
          {style && (
            <style>{style}</style>
          )}
        </head>
        <body
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </html>
    )
  }
}

export default Html
