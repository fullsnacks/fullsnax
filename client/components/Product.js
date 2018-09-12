import React from 'react'

const tempStyles = {
  border: '1px solid black',
  width: '120px',
  height: '200px',
  margin: '10px',
  textAlign: 'center'
}

const Product = props => {
  const {product} = props
  return (
    <div style={tempStyles}>
      <h4>{product.name}</h4>
      <img src={product.imageUrl} width="100" alt="" />
      <h6>${product.price / 100}</h6>
    </div>
  )
}

export default Product
