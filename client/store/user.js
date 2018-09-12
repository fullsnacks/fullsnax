import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const SET_ALL_USERS = 'SET_ALL_USERS'
const REMOVE_USER = 'REMOVE_USER'
const DELETE_USER = 'DELETE_USER'

/**
 * INITIAL STATE
 */
const initialState = {users: [], defaultUser: {}}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const setAllUsers = users => ({type: SET_ALL_USERS, users})
const removeUser = () => ({type: REMOVE_USER})
const deleteUser = user => ({type: DELETE_USER, user})

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
    history.push('/home')
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
      console.log('users in thunk', users)
      const action = setAllUsers(users)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

export const destroyUser = deleted => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${deleted.id}`)
      const action = deleteUser(deleted)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case SET_ALL_USERS:
      return {...state, users: action.users}
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.user.id)
      }
    case REMOVE_USER:
      return initialState
    default:
      return state
  }
}
