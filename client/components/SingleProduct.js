import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct, makeSale} from '../store/products'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      purchasePrice: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.id
    this.props.fetchSingleProduct(productId)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit() {
    try {
      await this.setState({
        purchasePrice: this.props.products.singleProduct.price,
        productId: this.props.products.singleProduct.id
      })
      await this.props.makeSale(this.state)
    } catch (error) {
      alert(error)
    }
  }

  render() {
    const product = this.props.products.singleProduct
    const dollarPrice = product.price / 100

    const inventoryArray = () => {
      let arr = []
      for (let i = 1; i <= product.inventory; i++) {
        arr.push(i)
      }
      return arr
    }

    return (
      <div className="single-product">
        <div className="single-product-card">
          <div className="single-product-card-left">
            <h1>{product.name}</h1>
            <img src={product.imageUrl}/>
          </div>
          <div className="single-product-card-right">
            <h4>About:</h4>
            <p style={{fontStyle: 'italic'}}>{product.description}</p>
            <br />
            <p>Price: ${dollarPrice.toFixed(2)}</p>
            <p>Select Quantity:</p>
            <div className="single-product-card-select">
              <select
                name="quantity"
                onChange={this.handleChange}
              >
                {inventoryArray().map(index => {
                  return (
                    <option value={index} key={index}>
                      {index}
                    </option>
                  )
                })}
              </select>
            </div>
            <br/>
            <button
              onClick={this.handleSubmit}
              className="single-product-card-add"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = ({products}) => ({products})

const mapDispatch = dispatch => ({
  fetchSingleProduct: id => {
    dispatch(getSingleProduct(id))
  },
  makeSale: state => {
    dispatch(makeSale(state))
  }
})

export default connect(mapState, mapDispatch)(SingleProduct)
