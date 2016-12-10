import moment from 'moment'
import Hashids from 'hashids'
import _ from 'lodash'
import { inspect } from 'util'
import { HASH_KEY } from '../secret'

// 初始化hash算法
const hashids = new Hashids(HASH_KEY, 8)
// 当前进程id
const processId = process.pid

export default () => {
  return async (ctx, next) => {
    const start = moment()
    const headers = ctx.headers
    const requestIP = headers['x-forwarded-for'] || headers['X-Real-IP'] || ctx.ip || '0.0.0.0'
    const requestMethod = ctx.method
    const requestUrl = ctx.request.path
    const startUnixtime = start.valueOf()
    let requestId = ''
    if (requestUrl.startsWith('/api/')) {
      // 根据当前进程号，unix时间戳，1-3位随机数组合生成hashid
      requestId = hashids.encode([processId, startUnixtime, _.random(0, 999)])
      ctx.state = ctx.state || {}
      ctx.state['reqId'] = requestId
    }
    await next()
    const ms = moment().valueOf() - startUnixtime
    const payload = {
      time: start.format('YYYY-MM-DD HH:mm:ss'),
      latency: ms
    }
    if (requestUrl.startsWith('/api/')) {
      payload.request = {
        id: requestId,
        ip: requestIP,
        headers: ctx.headers,
        query: ctx.request.query,
        body: ctx.request.body
      }
      payload.response = {
        status: ctx.status,
        headers: ctx.response.headers,
        body: ctx.body
      }
    }
    const formattedPayload = inspect(payload, {
      colors: true
    })
    console.log(`==> [REQUEST] -> ${requestMethod} ${requestUrl}: ${formattedPayload}`)
  }
}
