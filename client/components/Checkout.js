import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, finishOrder} from '../store/orders'
import {me, getUserCart, finishUserOrder} from '../store/user'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: this.props.userCart,
      promoUsed: false,
    }
    this.getCartTotal = this.getCartTotal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePromo = this.handlePromo.bind(this)
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

  handleSubmit(event) {
    event.preventDefault()
    const cartId = this.state.cart[0].id;
    if (!this.props.user.id) {
      this.props.finishOrder(cartId);
    } else {
      this.props.finishUserOrder(cartId);
    }
    this.props.history.push('/orderComplete')
  }

  handlePromo(event) {
    event.preventDefault()
    if (event.target.promo.value.toLowerCase() === 'dakotaisaloser') {
      const newCart = this.state.cart.map(sale => ({...sale, price: Number((sale.price / 2).toFixed(0)) }))
      this.setState({
        cart: newCart,
        promoUsed: true,
      })
    }
  }

  render() {
    const {cart, promoUsed} = this.state
    return !cart.length ? null : (
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
              <h6 style={{margin: '15px'}}>
                Subtotal: ${(item.price * item.quantity / 100).toFixed(2)}
              </h6>
            </div>
          )
        })}
        <h2>Your total: ${(this.getCartTotal(cart) / 100).toFixed(2)}</h2>
        {!promoUsed &&
        <div>
          <form onSubmit={this.handlePromo}>
            <label htmlFor="promo">Have a promo code?</label>
            <input type="text" name="promo"/>
            <button type="submit">Apply</button>
          </form>
        </div>}
        <h5>Please enter your shipping information:</h5>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">Street Address</label>
          <input type="text" />
          <label htmlFor="">City</label>
          <input type="text" />
          <label htmlFor="">State</label>
          <input type="text" />
          <label htmlFor="">Zip</label>
          <input type="text" />
          <button type="submit">CONFIRM ORDER</button>
        </form>
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
  getUserCart: id => dispatch(getUserCart(id)),
  finishOrder: id => dispatch(finishOrder(id)),
  finishUserOrder: id => dispatch(finishUserOrder(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
