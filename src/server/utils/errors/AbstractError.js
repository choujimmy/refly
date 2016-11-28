/* @flow */

/**
 * 自定义错误基类
 */
export default class AbstractError extends Error {
  constructor (message: string) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}
