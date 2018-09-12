import axios from 'axios'

const initialState = {
  products: [],
  singleProduct: {}
}

const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

const setSingleProduct = product => ({
  type: SET_SINGLE_PRODUCT,
  product
})

export const getProducts = () => async dispatch => {
  try {
    const {data: products} = await axios.get('/api/products')
    dispatch(setProducts(products))
  } catch (error) {
    console.log(error)
  }
}

export const getSingleProduct = (id) => async dispatch => {
  try {
    const {data: product} = await axios.get(`/api/products/${id}`)
    dispatch(setSingleProduct(product))
  } catch (error) {
    console.log(error)
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, products: action.products}
    case SET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    default:
      return state
  }
}
