import axios from 'axios'

const initialState = {
  products: [],
  singleProduct: {}
}

const SET_PRODUCTS = 'SET_PRODUCTS'

const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

export const getProducts = () => async dispatch => {
  try {
    const {data: products} = await axios.get('/api/products')
    dispatch(setProducts(products))
  } catch (error) {
    console.log(error)
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, products: action.products}
    default:
      return state
  }
}
