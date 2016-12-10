import moment from 'moment'
import colors from 'colors'

import { generateToken, verifyToken } from '../services/auth/login'

export default () => {
  return async (ctx, next) => {
    const path = ctx.request.path
    if (!path.startsWith('/api/')) {
      return await next()
    }
    const headers = ctx.headers
    const authorization = headers['authorization']
    const userAgent = headers['user-agent']
    if (authorization) {
      const parts = authorization.split(' ')
      if (parts.length === 2 && parts[0] === 'Bearer') {
        const token = parts[1]
        try {
          const user = verifyToken(token)
          if (user && user.userAgent === userAgent) {
            ctx.state = ctx.state || {}
            ctx.state['userId'] = user.userId
            ctx.state['roles'] = user.roles
            // 判断是否需要续期TOKEN
            if (user.renewTime < moment().unix()) {
              const newToken = generateToken(user.userId, user.roles, userAgent, user.days)
              ctx.response.set('x-refly-token', newToken)
            }
          }
        } catch (err) {
          console.error(colors.red(`==> [ERROR] ->  授权访问Token校验错误`), err)
        }
      }
    }
    return await next()
  }
}
