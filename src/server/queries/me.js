/* @flow */
import UserType from '../types/User'

const me = {
  type: UserType,
  resolve (parentValues: Object, args: Object, { request }: Object) {
    console.log('user', request)
    return request.user && {
      id: request.user.id,
      email: request.user.email
    }
  }
}

export default me
