const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  sessionId: {
    type: Sequelize.STRING
  },
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  promoUsed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
