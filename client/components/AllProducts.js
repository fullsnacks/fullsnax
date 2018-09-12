import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Product from './Product'
import {getProducts} from '../store/products'

const tempStyles = {
  display: 'flex',
  flexWrap: 'wrap'
}

class AllProducts extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {products} = this.props
    return (
      products.length && (
        <div>
          <h1>Our Products:</h1>
          <div style={tempStyles}>
            {products.map(product => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      )
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
