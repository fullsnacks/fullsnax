import React, {Component} from 'react'
import {connect} from 'react-redux'
import { getSingleProduct } from '../store/products';
import axios from 'axios'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0,
      purchasePrice: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount () {
    const productId = this.props.match.params.id
    this.props.fetchSingleProduct(productId);
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
      purchasePrice: this.props.products.singleProduct.price,
      productId: this.props.products.singleProduct.id
    })
    console.log(this.state)
  }

  async handleSubmit (evt) {
    try {
      await axios.post('/api/orderItems', this.state);
    } catch (error) {
      alert(error)
    }
  }

  render () {
    const product = this.props.products.singleProduct
    const dollarPrice = product.price/100
    return (
      <div>
        <h1>{product.name}</h1>
        <img src={product.imageUrl} style={{maxWidth: '400px'}}/>
        <p style={{fontStyle: 'italic'}}>{product.description}</p>
        <br/>
        <p>Price: ${dollarPrice.toFixed(2)}</p>
        <p>Stock: {product.inventory}</p>
        <p>Select Quantity:
          <select name='quantity' onChange={this.handleChange}>
            <option value='0'>0</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
            <option value='11'>11</option>
            <option value='12'>12</option>
            <option value='13'>13</option>
            <option value='14'>14</option>
            <option value='15'>15</option>
          </select>
        </p>
        <button onClick={this.handleSubmit}>Add to cart</button>
      </div>
    )
  }
}

const mapState = ({products}) => ({products})

const mapDispatch = dispatch => ({
    fetchSingleProduct: (id) => {
      dispatch(getSingleProduct(id));
    }
})


export default connect(mapState, mapDispatch)(SingleProduct)
