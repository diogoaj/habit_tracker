import React, { Component } from 'react'

class User extends Component {
  render() {
    return (
      <div>
        {this.props.user.username}
      </div>
    )
  }
}

export default User
