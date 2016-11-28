import AbstractError from './AbstractError'

/**
 * 数据库操作错误类
 */
export default class SQLError extends AbstractError {

  /**
   * Mysql数据库操作错误类构造函数
   * @param  {[Object]} err [
   * {
   *   code: 'node-mysql定义的错误code',
   *   fatal: '是否严重',
   *   message: '错误信息',
   *   stack: '错误堆栈上下文'
   * }]
   */
  constructor (err) {
    super(err)
    this.type = 'SQL'
    this.detail = {
      code: err.code,
      fatal: err.fatal
    }
  }
}
