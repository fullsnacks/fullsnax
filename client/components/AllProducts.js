import React, {Component} from 'react'
import {connect} from 'react-redux'
import ProductCard from './ProductCard'
import {getProducts} from '../store/products'
import {NavLink} from 'react-router-dom'

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
        <div className="products">
          <h1>Our Products:</h1>
          <div className="products-search">
            <div className="products-search-filter">
              <label htmlFor="filterText">Search by name:</label>
              <br />
              <input
                type="text"
                name="filterText"
                value={filterText}
                onChange={this.handleChange}
              />
            </div>
            <div className="products-search-select">
              <form onChange={this.handleChange}>
                <label htmlFor="">Filter by category</label>
                <br/>
                <select name="" id="">
                  <option value="">All</option>
                  <option value="candy">Candy</option>
                  <option value="chips">Chips</option>
                  <option value="chocolate">Chocolate</option>
                  <option value="cookies">Cookies</option>
                  <option value="other">Other</option>
                </select>
              </form>
            </div>
          </div>
          <div className="products-display">
            {products
              .filter(
                product =>
                  product.name
                    .toLowerCase()
                    .includes(filterText.toLowerCase()) ||
                  product.category
                    .toLowerCase()
                    .includes(filterText.toLowerCase())
              )
              .map(product => (
                <NavLink key={product.id} to={`/products/${product.id}`}>
                  <ProductCard product={product} key={product.id} />
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
