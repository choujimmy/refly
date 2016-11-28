/* @flow */
import moment from 'moment'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../secret'

/**
 * [创建jwt授权token]
 * @param  {[Number]} userId    [用户id]
 * @param  {[String]} userAgent [用户浏览器代理字串]
 * @param  {[Number]} days      [token有效期天数]
 * @return {[String]}           [jwt字符串]
 */
const generateToken = (userId: number, userAgent: string, days: number) => {
  return jwt.sign({
    userId,
    userAgent,
    days,
    renewTime: moment().add(1, 'h').unix()
  }, SECRET_KEY, {
    expiresIn: `${days}d`
  })
}

/**
 * [校验token]
 * @param  {[String]} token [授权token]
 * @return {[Object]}       [用户对象实例]
 */
const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY)
}

export { generateToken, verifyToken }
