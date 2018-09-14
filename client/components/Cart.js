// import React, {Component} from 'react'
// import { connect } from 'react-redux';
// import { getCart } from '../store/orders';

// const dummyData = [
//   {
//     id: 1,
//     name: 'Cheetos',
//     price: 500,
//     quantity: 1
//   },
//   {
//     id: 3,
//     name: 'Oreos',
//     price: 1000,
//     quantity: 2
//   },
//   {
//     id: 5,
//     name: 'Snufflebars',
//     price: 25000,
//     quantity: 3
//   }
// ]

// class Cart extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       orders: [],
//     }
//     this.getCartTotal = this.getCartTotal.bind(this)
//   }

//   getCartTotal(cart) {
//     return cart.reduce((accumulator, currentVal) => {
//       accumulator += currentVal.price * currentVal.quantity
//       return accumulator
//     }, 0)
//   }

//   render() {
//     return (
//       <div>
//         <h4>Your current shopping cart:</h4>
//         {dummyData.map(item => {
//           return (
//             <div
//               key={item.id}
//               style={{display: 'flex', border: '1px solid black'}}
//             >
//               <h6 style={{margin: '15px'}}>{item.name}</h6>
//               <div style={{textAlign: 'center'}}>
//                 <h6 style={{margin: '15px'}}>Quantity:{item.quantity}</h6>
//                 <button>+</button>
//                 <button>-</button>
//               </div>
//               <h6 style={{margin: '15px'}}>
//                 Subtotal: ${(item.price * item.quantity / 100).toFixed(2)}
//               </h6>
//             </div>
//           )
//         })}
//         <h2>Your total: ${(this.getCartTotal(dummyData) / 100).toFixed(2)}</h2>
//         <button>CHECKOUT</button>
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => ({
//   guestCart: state.orders.cart,
//   userOrders: state.user.defaultUser.orders,
// });

// const mapDispatchToProps = dispatch => ({
//   getCart: id => dispatch(getCart(id))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Cart);
