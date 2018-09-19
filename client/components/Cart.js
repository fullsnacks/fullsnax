import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, deleteSale} from '../store/orders'
import {me, getUserCart} from '../store/user'
import {Link} from 'react-router-dom'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      loading: true
    }
    this.getCartTotal = this.getCartTotal.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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

  componentDidUpdate() {
    if (this.state.loading) {
    this.setState({
      loading: false
    })
    }
  }

  async handleDelete(id) {
    await this.props.deleteSale(id)
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
    if (!cart.length && this.state.loading) {
      return (
        <div className='loading'>
          <img src='/loading.gif'></img>
        </div>
      )
    }
    else if (!cart.length && !this.state.loading) {
      return (
        <div style={{textAlign: 'center'}}>
          <img src="/cookieMonster.jpg" />
        </div>
      )
    }
    else if (cart.length) {
      this.state.loading === true;
      return (
        <div className="cart">
          <h4>Your current shopping cart:</h4>
          {cart.map(item => {
            return (
              <div className='cart-item' key={item.id}>
                <div className="cart-item-text">
                  <ul>
                    <li>Product: {item.name}</li>
                    <li>Quantity: {item.quantity}</li>
                    <li>Price: ${(item.price/100).toFixed(2)} each</li>
                    <li>Subtotal: ${((item.quantity * item.price)/100).toFixed(2)}</li>
                  </ul>
                </div>
                <div className="cart-item-delete">
                  <button onClick={() => this.handleDelete(item.saleId)}>
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
          <h2>Your Total: ${(this.getCartTotal(cart) / 100).toFixed(2)}</h2>
          <Link to="/products">
              <button className="cart-to-products">CONTINUE SHOPPING</button>
          </Link>
          <Link to="/checkout">
            <button className="cart-to-checkout">GO TO CHECKOUT</button>
          </Link>
        </div>
      )
    }

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
  getUserCart: id => dispatch(getUserCart(id)),
  deleteSale: id => dispatch(deleteSale(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
