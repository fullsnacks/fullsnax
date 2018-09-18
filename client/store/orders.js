import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'
const GET_CART = 'GET_CART'
const COMPLETE_ORDER = 'COMPLETE_ORDER'
const PUT_PROMO = 'PUT_PROMO'
const DELETE_FROM_ORDER = 'DELETE_FROM_ORDER'

const initialState = {orders: [], cart: []}

const getOrders = orders => ({type: GET_ORDERS, orders})
const getCart = cart => ({type: GET_CART, cart})
const completeOrder = () => ({
  type: COMPLETE_ORDER
})
const putPromo = cart => ({type: PUT_PROMO, cart})
const deleteFromOrder = saleId => ({
  type: DELETE_FROM_ORDER,
  saleId
})

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
        accumulator[currentVal.product.name] = {}
        accumulator[currentVal.product.name].saleId = currentVal.id
        accumulator[currentVal.product.name].id = currentVal.orderId
        accumulator[currentVal.product.name].quantity = currentVal.quantity
        accumulator[currentVal.product.name].price = currentVal.purchasePrice
        return accumulator
      }, {})
      const guestCart = Object.keys(cartObj).reduce(
        (accumulator, currentVal) => {
          const newObj = {
            promoUsed: cart.promoUsed,
            name: currentVal,
            id: cartObj[currentVal].id,
            saleId: cartObj[currentVal].saleId,
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

export const finishOrder = orderId => async dispatch => {
  try {
    await axios.put(`/api/orders/${orderId}`)
    dispatch(completeOrder())
  } catch (error) {
    console.log(error)
  }
}

export const setPromo = orderId => async dispatch => {
  try {
    const cart = await axios.put(`/api/orders/${orderId}/applyPromo`)
    dispatch(putPromo(cart))
  } catch (error) {
    console.log(error)
  }
}

export const deleteSale = saleId => async dispatch => {
  try {
    await axios.delete(`/api/sales/${saleId}`)
    dispatch(deleteFromOrder(saleId))
  } catch (error) {
    console.log(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {...state, orders: action.orders}
    case GET_CART:
      return {...state, cart: action.cart}
    case COMPLETE_ORDER:
      return {...state, cart: []}
    case PUT_PROMO:
      return {...state, cart: action.cart}
    case DELETE_FROM_ORDER:
      return {
        ...state,
        cart: state.cart.filter(sale => sale.saleId !== action.saleId)
      }
    default:
      return state
  }
}
