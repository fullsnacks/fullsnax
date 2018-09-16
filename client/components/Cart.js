import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/orders'

const dummyData = [
  {
    id: 1,
    name: 'Cheetos',
    price: 500,
    quantity: 1
  },
  {
    id: 3,
    name: 'Oreos',
    price: 1000,
    quantity: 2
  },
  {
    id: 5,
    name: 'Snufflebars',
    price: 25000,
    quantity: 3
  }
]

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: []
    }
    this.getCartTotal = this.getCartTotal.bind(this)
  }
  getCartTotal(cart) {
    return cart.reduce((accumulator, currentVal) => {
      accumulator += currentVal.price * currentVal.quantity
      return accumulator
    }, 0)
  }

  componentDidMount() {
    //need to send guestId? to getCart function for guest cart
    //this.props.getCart(this.props.userId)
  }

  render() {
    const {cart} = this.props
    return (
      cart.length && (
        <div>
          <h4>Your current shopping cart:</h4>
          {cart.map(item => {
            return (
              <div
                key={item.id}
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
            Your total: ${(this.getCartTotal(dummyData) / 100).toFixed(2)}
          </h2>
          <form action="">
            <label htmlFor="">Street Address</label>
            <input type="text" />
            <label htmlFor="">City</label>
            <input type="text" />
            <label htmlFor="">State</label>
            <input type="text" />
            <label htmlFor="">Zip</label>
            <input type="text" />
          </form>
          <button>CONFIRM ORDER</button>
        </div>
      )
    )
  }
}

const mapStateToProps = state => ({
  guestCart: state.orders.cart
  // userOrders: state.user.defaultUser.orders,
})

const mapDispatchToProps = dispatch => ({
  getCart: id => dispatch(fetchCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
