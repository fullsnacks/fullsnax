import React from 'react'

const tempStyles = {
  border: '1px solid black',
  width: '120px',
  height: '200px',
  margin: '10px',
  textAlign: 'center'
}

// consider renaming to AllProducts-Card - R.K.
const Product = props => {
  const {product} = props
  return (
    // make sure to identify divs (and other jsx elements) - R.K.
    <div style={tempStyles}>
      <h4>{product.name}</h4>
      <img src={product.imageUrl} width="100" alt="" />
      <h6>${(product.price / 100).toFixed(2)}</h6>
    </div>
  )
}

export default Product
