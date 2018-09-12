import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUsers} from '../store/user'

class SingleUser extends Component {
  componentDidMount() {
    this.props.fetchInitialUsers()
  }
  render() {
    const userId = Number(this.props.match.params.userId)
    const users = this.props.users
    if (!users) {
      return <div>loading...</div>
    } else {
      const filteredUser = users.filter(user => user.id === userId)
      let selectedUser = filteredUser
      if (filteredUser[0]) {
        selectedUser = filteredUser[0]
      }

      return (
        <div>
          <div>
            {selectedUser.firstName} {selectedUser.lastName}
          </div>
          <div> {selectedUser.email} </div>
          <div>{selectedUser.streetAddress}</div>
          <div>
            {selectedUser.city}, {selectedUser.state} {selectedUser.zip}
          </div>
          {/* <UserUpdate selectedUser={selectedUser} /> */}
          <button type="submit" onClick={() => {}}>
            Edit
          </button>
          <button type="submit" onClick={() => {}}>
            View Order History
          </button>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
