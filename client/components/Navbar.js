import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const tempStyles = {
  height: '60px',
  display: 'flex',
  lineHeight: '60px',
  verticalAlign: 'middle'
}

const logoStyle = {
  fontFamily: 'Luckiest Guy',
  fontSize: '2em',
  textShadow: '2px 2px black',
  color: 'orange',
  textOutline: 'black'
}

const tempCartStyle = {
  marginBottom: '-6px',
  height: '25px'
}

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav style={tempStyles}>
      <a href="/">
        <h1 style={logoStyle}>FULLSNAXX</h1>
      </a>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/myAccount">My Account</Link>
          <Link to="/products">Products</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/cart"><img src="/cart.png" style={tempCartStyle} alt="cart"/></Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/products">Products</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart"><img src="/cart.png" style={tempCartStyle} alt="cart"/></Link>
        </div>
      )}
    </nav>
    <hr />
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
