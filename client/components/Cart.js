import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/orders'
import {me, getUserCart} from '../store/user'

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
      const id = this.props.user.id;
      await this.props.getUserCart(id);
      this.setState({
        cart: this.props.userCart,
      })
    }
  }

  render() {
    const {cart} = this.state
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
              <h6 style={{margin: '15px'}}>
                Subtotal: ${(item.price * item.quantity / 100).toFixed(2)}
              </h6>
            </div>
          )
        })}
        <h2>
          Your total: ${(this.getCartTotal(cart) / 100).toFixed(2)}
        </h2>
        {/* <form action="">
          <label htmlFor="">Street Address</label>
          <input type="text" />
          <label htmlFor="">City</label>
          <input type="text" />
          <label htmlFor="">State</label>
          <input type="text" />
          <label htmlFor="">Zip</label>
          <input type="text" />
        </form> */}
        <button>CONFIRM ORDER</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  guestCart: state.orders.cart,
  // userOrders: state.user.defaultUser.orders,
  user: state.user.defaultUser,
  userCart: state.user.userCart,
  products: state.products.products,
})

const mapDispatchToProps = dispatch => ({
  getCart: id => dispatch(fetchCart(id)),
  me: () => dispatch(me()),
  getUserCart: id => dispatch(getUserCart(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
