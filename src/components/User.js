import React, { Component } from 'react'

class User extends Component {
  render() {
    return (
      <button className="outline pa3 mv1 f4">
        <div className="fl">
          {this.props.user.username}
        </div>
      </button>
    )
  }
}

export default User
