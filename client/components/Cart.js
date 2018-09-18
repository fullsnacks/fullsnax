import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/orders'
import {me, getUserCart} from '../store/user'
import {Link} from 'react-router-dom'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: []
    }
    this.getCartTotal = this.getCartTotal.bind(this)
  }
  getCartTotal(cart) {
    return cart.reduce((accumulator, currentVal) => {
      accumulator += currentVal.price * currentVal.quantity
      return accumulator
    }, 0)
  }

  async componentDidMount() {
    await this.props.me()
    if (this.props.user.id) {
      const id = this.props.user.id
      await this.props.getUserCart(id)
      this.setState({
        cart: this.props.userCart
      })
    } else {
      await this.props.getCart()
      this.setState({
        cart: this.props.guestCart
      })
    }
  }

  render() {
    const {cart} = this.state
    if (!cart.length) {
      return <div style={{textAlign: 'center'}} >
        <img src='/cookieMonster.jpg'></img>
      </div>
    }
    return cart.length && (
      <div>
        <h4>Your current shopping cart:</h4>
        {cart.map(item => {
          return (
            <div
              key={item.name}
              style={{display: 'flex', border: '1px solid black'}}
            >
              <h6 style={{margin: '15px'}}>{item.name}</h6>
              <div style={{textAlign: 'center'}}>
                <h6 style={{margin: '15px'}}>Quantity:{item.quantity}</h6>
              </div>
            </div>
          )
        })}
        <h2>Your total: ${(this.getCartTotal(cart) / 100).toFixed(2)}</h2>
        <Link to="/checkout">
          <button>GO TO CHECKOUT</button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  guestCart: state.orders.cart,
  user: state.user.defaultUser,
  userCart: state.user.userCart
})

const mapDispatchToProps = dispatch => ({
  getCart: id => dispatch(fetchCart(id)),
  me: () => dispatch(me()),
  getUserCart: id => dispatch(getUserCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
