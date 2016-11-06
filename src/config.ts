export const port = process.env.PORT || 3000
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`

export const auth = {
  sessionKey: process.env.sessionKey || 'jfa^7uY(#)',
  jwt: { secret: process.env.JWT_SECRET || 'NKF87%j@nc' }
}
