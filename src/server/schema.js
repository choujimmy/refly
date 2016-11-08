/* @flow */
import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType
} from 'graphql'

import me from './queries/me'
import intl from './queries/intl'

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      intl
    }
  })
})

export default schema
