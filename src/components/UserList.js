import React, { Component } from 'react'
import User from './User'
import { useQuery } from 'react-apollo'
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

const UserList = () => {
  const { data } = useQuery(USER_QUERY);

  return (
    <div className="dib">
      {data && (
        <>
          {data.users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
};


export default UserList