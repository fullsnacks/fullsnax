import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const SET_ALL_USERS = 'SET_ALL_USERS'
const REMOVE_USER = 'REMOVE_USER'
const DELETE_USER = 'DELETE_USER'
const SET_USER_CART = 'SET_USER_CART'
const SET_GUEST_ID = 'SET_GUEST_ID'
const GET_PAST_ORDERS = 'GET_PAST_ORDERS'

/**
 * INITIAL STATE
 */
const initialState = {users: [], defaultUser: {}, userCart: [], guestId: null, pastOrders: []}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const setAllUsers = users => ({type: SET_ALL_USERS, users})
const removeUser = () => ({type: REMOVE_USER})
const deleteUser = user => ({type: DELETE_USER, user})
const setUserCart = cart => ({
  type: SET_USER_CART,
  cart,
})
const setGuest = guestId => ({
  type: SET_GUEST_ID,
  guestId,
})
const getPastOrders = pastOrders => ({
  type: GET_PAST_ORDERS,
  pastOrders
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialState.defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/myAccount')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/users')
      const users = response.data
      const action = setAllUsers(users)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

export const destroyUser = user => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${user.id}`)
      const action = deleteUser(user)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

export const getUserCart = id => async dispatch => {
  try {
    const { data:userInfo } = await axios.get(`/api/users/${id}/currentOrder`);
    const orderId = userInfo.orders[0].id;
    const cartObj = userInfo.orders[0].sales.reduce((accumulator, currentVal) => {
      if (accumulator.hasOwnProperty(currentVal.product.name)) {
        accumulator[currentVal.product.name].quantity += currentVal.quantity;
      } else {
        accumulator[currentVal.product.name] = {}
        accumulator[currentVal.product.name].quantity = currentVal.quantity;
        accumulator[currentVal.product.name].price = currentVal.product.price;
      }
      return accumulator;
    }, {})
    const userCart = Object.keys(cartObj).reduce((accumulator, currentVal) => {
      const newObj = { id: orderId, name: currentVal, quantity: cartObj[currentVal].quantity, price: cartObj[currentVal].price}
      accumulator.push(newObj);
      return accumulator;
    }, [])
    dispatch(setUserCart(userCart));
  } catch (error) {
    console.log(error);
  }
}

export const getGuest = () => async dispatch => {
  try {
    const {data:id} = await axios.get('/guest');
    dispatch(setGuest(id))
  } catch (error) {
    console.log(error);
  }
}

export const fetchPastOrders = (id) => async dispatch => {
  try {
    const response = await axios.get(`/api/users/${id}`)
    const orders = response.data.orders
    dispatch(getPastOrders(orders))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, defaultUser: action.user}
    case SET_ALL_USERS:
      return {...state, users: action.users}
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.user.id)
      }
    case REMOVE_USER:
      return {
        ...state,
        defaultUser: {}
      }
    case SET_USER_CART:
      return {...state, userCart: action.cart}
    case GET_PAST_ORDERS:
      return {...state, pastOrders: action.pastOrders}
    default:
      return state
  }
}
