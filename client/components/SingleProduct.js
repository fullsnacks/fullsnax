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

  componentDidMount () {
    const productId = this.props.match.params.id;
    this.props.fetchSingleProduct(productId);
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
      purchasePrice: this.props.products.singleProduct.price,
      productId: this.props.products.singleProduct.id
    })
  }

  async handleSubmit (evt) {
    try {
      if (this.state.quantity === 0) {
        alert('Please select a valid quantity.')
      } else {
      await axios.post('/api/sales', this.state);
      }
    } catch (error) {
      alert(error)
    }
  }

  render () {
    const product = this.props.products.singleProduct
    const dollarPrice = product.price/100

    const inventoryArray = () => {
      let arr = [];
      for (let i=0; i<=product.inventory; i++) {
        arr.push(i)
      }
      return arr
    }

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
          {inventoryArray().map(index => {
            return <option value={index} key={index}>{index}</option>
          })}
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
