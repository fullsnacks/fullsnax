import React, {Component} from 'react'
import {connect} from 'react-redux'
import Product from './Product'
import {getProducts} from '../store/products'
import {NavLink} from 'react-router-dom'

const tempStyles = {
  display: 'flex',
  flexWrap: 'wrap'
}

class AllProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterText: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  handleChange(event) {
    this.setState({
      filterText: event.target.value
    })
  }

  render() {
    const {products} = this.props
    const {filterText} = this.state
    return (
      products.length && (
        <div>
          <h1>Our Products:</h1>
          <label htmlFor="filterText">Search by name:</label>
          <br />
          <input
            type="text"
            name="filterText"
            value={filterText}
            onChange={this.handleChange}
          />
          <div style={tempStyles}>
            {products
              .filter(product =>
                product.name.toLowerCase().includes(filterText.toLowerCase())
              )
              .map(product => (
                <NavLink key={product.id} to={`/products/${product.id}`}>
                  <Product product={product} key={product.id} />
                </NavLink>
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
