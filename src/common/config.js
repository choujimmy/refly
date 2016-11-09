/* @flow */
export const port = process.env.PORT || 3000
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`

// 默认区域属性为数字索引为0的元素en-US
export const locales = ['en-US', 'zh-CN']

export const test = {
  jwt: 'jwtjwt'
}
