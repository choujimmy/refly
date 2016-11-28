import moment from 'moment'
import pathToRegExp from 'path-to-regexp'
import colors from 'colors'

import { generateToken, verifyToken } from '../services/auth/login'

const allowedPathMethodMap = new Map()
allowedPathMethodMap.set('/api/lobby/rule/availableRules', new Set(['GET']))

const isUsingAllowedMethodVisitAllowedPath = ({path, method}) => {
  let isUsingAllowedMethodVisitAllowedPath = false
  for (let [allowedPath, allowedMethodSet] of allowedPathMethodMap.entries()) {
    let regexp = pathToRegExp(allowedPath, [])
    if (regexp.test(path) && allowedMethodSet.has(method)) {
      isUsingAllowedMethodVisitAllowedPath = true
      break
    }
  }

  return isUsingAllowedMethodVisitAllowedPath
}

const setUnauthrization = (ctx) => {
  const reqId = ctx.state ? (ctx.state.reqId || '') : ''
  ctx.status = 401
  ctx.body = { reqId, message: '未授权的访问' }
}

export default () => {
  return async (ctx, next) => {
    const path = ctx.request.path
    if (!path.startsWith('/api/')) {
      return await next()
    }
    const headers = ctx.headers
    const authorization = headers['authorization']
    const userAgent = headers['user-agent']
    const method = ctx.method
    let isAuthed = false
    if (authorization) {
      const parts = authorization.split(' ')
      if (parts.length === 2 && parts[0] === 'Bearer') {
        const token = parts[1]
        try {
          const user = verifyToken(token)
          if (user && user.userAgent === userAgent) {
            isAuthed = true
            ctx.state = ctx.state || {}
            ctx.state['userId'] = user.userId
            // 判断是否需要续期TOKEN
            if (user.renewTime < moment().unix()) {
              const newToken = generateToken(user.userId, userAgent, user.days)
              ctx.response.set('x-refly-token', newToken)
            }
          }
        } catch (err) {
          console.error(colors.red(`==> [ERROR] ->  授权访问Token校验错误`), err)
        }
      }
    }

    if ((!isAuthed) && (!isUsingAllowedMethodVisitAllowedPath({path, method}))) {
      return setUnauthrization(ctx)
    } else {
      return await next()
    }
  }
}
