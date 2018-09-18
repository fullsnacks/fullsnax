import React from 'react'

const Product = props => {
  const {product} = props
  return (
    <div className="product-card">
      <h4>{product.name}</h4>
      <img
        src={product.imageUrl}
        className="product-card-image"
        alt={product.name}
      />
      <h4>${(product.price / 100).toFixed(2)}</h4>
    </div>
  )
}

export default Product
