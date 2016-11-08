/* eslint no-unused-vars: 0 */

declare module CSSModule {
  declare var exports: { [key: string]: string }
}

declare module WebpackAssets {
  declare var exports: {
    app: {
      css: string,
      js: string
    }
  }
}

declare module ImageModule {
  declare var exports: string
}
