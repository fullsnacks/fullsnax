import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUsers, destroyUser} from '../store/user'

class Users extends Component {
  componentDidMount() {
    this.props.fetchInitialUsers()
  }

  render() {
    const {users} = this.props
    console.log('USERS', users)
    if (!users) {
      return <div>loading...</div>
    }
    if (!Array.isArray(users)) {
      return <div>No access!</div>
    } else
      return (
        users.length && (
          <div>
            {users.map(user => {
              return (
                <div key={user.id}>
                  <div>
                    <Link to={`/users/${user.id}`}>
                      <div>
                        {user.firstName} {user.lastName}
                      </div>
                    </Link>
                    <button
                      type="submit"
                      onClick={() => {
                        this.props.deleteUser(user)
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )
      )
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialUsers: () => dispatch(fetchUsers()),
    deleteUser: user => dispatch(destroyUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
