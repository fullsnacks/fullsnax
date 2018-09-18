import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchPastOrders} from '../store/user'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor() {
    super()
    this.state = {
      pastOrders: []
    }
  }

  componentDidMount() {
    this.props.fetchPastOrders(this.props.user.id)
  }

  render() {
    const {user} = this.props
    const orders = this.props.pastOrders
    if (!orders) {
      return (
        <div>
          <h2>Welcome back, {user.firstName}!</h2>
          <h3>Past Orders:</h3>
          <p>No past orders.</p>
        </div>
      )
    }

    const getTotal = order => {
      let total = 0
      for (let i = 0; i < order.sales.length; i++) {
        total += order.sales[i].purchasePrice * order.sales[i].quantity
      }
      return total
    }

    return (
      <div>
        <h2>Welcome back, {user.firstName}!</h2>
        <h3>Past Orders:</h3>
        {orders.map((order, index) => {
          return (
            <div key={order.id}>
              <p>
                <b>Order #{index + 1}</b>
              </p>
              <p>Placed on: {order.updatedAt}</p>
              <p>Total: ${(getTotal(order) / 100).toFixed(2)}</p>
              {order.sales.map(sale => {
                return (
                  <ul key={sale.id}>
                    Product: {sale.product.name} <br />
                    Quantity: {sale.quantity} <br />
                    Purchase Price: ${(sale.purchasePrice / 100).toFixed(
                      2
                    )}{' '}
                    each
                  </ul>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user.defaultUser,
    pastOrders: state.user.pastOrders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPastOrders: id => dispatch(fetchPastOrders(id))
  }
}

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
