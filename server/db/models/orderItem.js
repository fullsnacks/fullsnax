const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER
  },
  purchasePrice: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
})

module.exports = OrderItem
