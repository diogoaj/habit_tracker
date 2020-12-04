import React, { Component } from 'react'

class User extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.user.username}
        </div>
      </div>
    )
  }
}

export default User
