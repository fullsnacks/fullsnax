import React from 'react'

const tempStyles = {
  border: '1px solid black',
  width: '170px',
  height: '230px',
  margin: '10px',
  textAlign: 'center'
}

const imgStyle = {
  height: '100px',
  width: '140px',
  objectFit: 'contain'
}

const Product = props => {
  const {product} = props
  return (
    <div style={tempStyles}>
      <h4>{product.name}</h4>
      <img src={product.imageUrl} style={imgStyle} alt="" />
      <h6>${(product.price / 100).toFixed(2)}</h6>
    </div>
  )
}

export default Product
