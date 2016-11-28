import AbstractError from './AbstractError'

/**
 * 参数校验错误类
 */
export default class ValidationError extends AbstractError {

  /**
   * 参数校验错误类构造函数
   * @param  {[Object]} detail [
   * {
   *   message: '字符串提示错误信息',
   *   path: '以点号分割的错误字段路径',
   *   type: '错误类型',
   *   context: '错误上下文'
   * }]
   */
  constructor (detail) {
    super(detail.message)
    this.type = 'Validation'
    this.detail = detail
  }
}
