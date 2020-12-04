import React, { Component } from 'react'
import User from './User'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const USER_QUERY = gql`
  {
    users {
        id
        username
        habits {
            name
        }
    }
  }
`

class UserList extends Component {
  render() {
    return (
        <Query query={USER_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>
      
            const users = data.users

            return (
              <div>
                 {users.map(user => <User key={user.id} user={user} />)}
              </div>
            )
          }}
        </Query>
      )
  }
}

export default UserList