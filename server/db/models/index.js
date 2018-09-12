const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderItem = require('./orderItem')

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
OrderItem.hasOne(Product);
Product.belongsTo(OrderItem);
User.hasMany(Order);
Order.belongsTo(User);
OrderItem.hasOne(Product);

module.exports = {
  User,
  Product,
  Order,
  OrderItem
}
