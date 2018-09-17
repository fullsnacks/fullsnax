const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Sale = require('./sale')

User.hasMany(Order)
Order.belongsTo(User)
Product.hasMany(Sale)
Sale.belongsTo(Product)
Order.hasMany(Sale)
Sale.belongsTo(Order)

// redefine model associaton (e.g., Product.belongsToMany(Order, {through: Sale})) and vice versa

module.exports = {
  User,
  Product,
  Order,
  Sale
}
