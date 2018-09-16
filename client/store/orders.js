import axios from 'axios'
import history from '../history'

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

export const fetchCart = sessionId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/orders/${sessionId}`)
      const cart = response.data
      console.log('CART IN ORDERS STORE IS =====>', cart)
      const action = getCart(cart)
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
