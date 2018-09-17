const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  sessionId: {
    type: Sequelize.STRING
  },
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

// rename files to be capitalized - R.K.

module.exports = Order
