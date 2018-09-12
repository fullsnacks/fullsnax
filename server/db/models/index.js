const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderItem = require('./orderItem')

User.hasMany(Order);
Order.belongsTo(User);
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order)

module.exports = {
  User,
  Product,
  Order,
  OrderItem
}
