import { Record } from 'immutable'

export const UserRecord = Record({})

export interface UserAction {
  type: string
}

export function reducer (state = new UserRecord(), action?: UserAction) {
  switch (action.type) {
    default:
      return state
  }
}
