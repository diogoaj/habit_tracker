import React, { Component } from 'react'
import User from './User'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

const USER_QUERY = gql`
  {
    users {
        id
        username
    }
  }
`

const UserList = () => {
  const { data } = useQuery(USER_QUERY);

  return (
    <div className="flex flex-column mw5 mw8-ns center bg-light-gray pa3 mv3 ph5-ns">
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