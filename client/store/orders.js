import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'
const GET_CART = 'GET_CART'

const initialState = {orders: [], cart: {}}

const getOrders = orders => ({type: GET_ORDERS, orders})
const getCart = cart => ({type: GET_CART, cart})

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/orders')
      const orders = response.data
      const action = getOrders(orders)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchCart = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/guestCart')
      const cart = response.data
      const cartObj = cart.sales.reduce((accumulator, currentVal) => {
        if (accumulator.hasOwnProperty(currentVal.product.name)) {
          accumulator[currentVal.product.name].quantity += currentVal.quantity
        } else {
          accumulator[currentVal.product.name] = {}
          accumulator[currentVal.product.name].id = currentVal.orderId
          accumulator[currentVal.product.name].quantity = currentVal.quantity
          accumulator[currentVal.product.name].price = currentVal.product.price
        }
        return accumulator
      }, {})
      const guestCart = Object.keys(cartObj).reduce(
        (accumulator, currentVal) => {
          const newObj = {
            name: currentVal,
            id: cartObj[currentVal].id,
            quantity: cartObj[currentVal].quantity,
            price: cartObj[currentVal].price
          }
          accumulator.push(newObj)
          return accumulator
        },
        []
      )
      const action = getCart(guestCart)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {...state, orders: action.orders}
    case GET_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
