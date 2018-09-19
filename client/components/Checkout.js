import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, finishOrder, setPromo} from '../store/orders'
import {me, getUserCart, finishUserOrder} from '../store/user'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: this.props.userCart,
      promoUsed: this.props.userCart.promoUsed
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
        cart: this.props.userCart,
        promoUsed: this.props.userCart[0].promoUsed
      })
    } else {
      await this.props.getCart()
      this.setState({
        cart: this.props.guestCart,
        promoUsed: this.props.guestCart[0].promoUsed
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const cartId = this.state.cart[0].id
    if (!this.props.user.id) {
      this.props.finishOrder(cartId)
    } else {
      this.props.finishUserOrder(cartId)
    }
    this.props.history.push('/orderComplete')
  }

  handlePromo(event) {
    event.preventDefault()

    if (
      event.target.promo.value.toLowerCase() === 'dakotaisaloser' &&
      !this.state.promoUsed
    ) {
      const newCart = this.state.cart.map(sale => ({
        ...sale,
        price: Number((sale.price / 2).toFixed(0))
      }))
      this.setState({
        cart: newCart,
        promoUsed: true
      })
      const cartId = this.state.cart[0].id
      this.props.setPromo(cartId)
    }
  }

  render() {
    const {cart, promoUsed} = this.state
    return !cart.length ? null : (
      <div className="checkout">
        <h3>Your current shopping cart:</h3>
        {cart.map(item => {
          return (
            <div
              key={item.name}
              className="checkout-item"
            >
              <h4>{item.name}</h4>
              <h4>Quantity: {' ' + item.quantity}</h4>
              <h4>
                Subtotal: ${(item.price * item.quantity / 100).toFixed(2)}
              </h4>
            </div>
          )
        })}
        <h2>Your total: ${(this.getCartTotal(cart) / 100).toFixed(2)}</h2>
        {!promoUsed && (
          <div className="checkout-promo">
            <form onSubmit={this.handlePromo}>
              <div className="checkout-promo-label">
                <label htmlFor="promo">
                  Have a promo code?
                </label>
              </div>
              <div className="checkout-promo-input">
                <input type="text" name="promo" />
              </div>
              <div className="checkout-promo-submit">
                <button type="submit">Apply</button>
              </div>
            </form>
          </div>
        )}
        <div>
          <h5>Please enter your shipping information:</h5>
          <form onSubmit={this.handleSubmit} className="checkout-address">
            <div>
              <label htmlFor="">Street Address:</label>
              <input type="text" className="checkout-address-street"/>
            </div>
            <div className="checkout-address-other">
              <label htmlFor="">City:</label>
              <input type="text" />
              <label htmlFor="">State:</label>
              <input type="text" className="checkout-address-state"/>
              <label htmlFor="">Zip:</label>
              <input type="text" className="checkout-address-zip"/>
            </div>
            <button className="checkout-submit" type="submit">CONFIRM ORDER</button>
          </form>
        </div>
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
  setPromo: id => dispatch(setPromo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
