import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

// const logoStyle = {

// }

const tempCartStyle = {}

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navbar">
    <ul>
      <Link to="/">
        <li>
          <h1 className="navbar-brand">FULLSNAXX</h1>
        </li>
      </Link>
      {isLoggedIn ? (
        <div className="navbar-links">
          <Link to="/products">
            <li>Products</li>
          </Link>
          <a href="#" onClick={handleClick}>
            <li>Logout</li>
          </a>
          <Link to="/myAccount">
            <li>My Account</li>
          </Link>
          <Link to="/cart" className="navbar-cart">
            <li>
              <img src="/cart.png" className="navbar-cart" alt="cart" />
            </li>
          </Link>
        </div>
      ) : (
        <div className="navbar-links">
          <Link to="/products">
            <li>Products</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>
          <Link to="/signup">
            <li>Sign Up</li>
          </Link>
          <Link to="/cart" className="navbar-cart">
            <li>
              <img src="/cart.png" className="navbar-cart" alt="cart" />
            </li>
          </Link>
        </div>
      )}
    </ul>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.defaultUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
