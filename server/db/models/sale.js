const Sequelize = require('sequelize')
const db = require('../db')

const Sale = db.define('sale', {
  quantity: {
    type: Sequelize.INTEGER
  },
  purchasePrice: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
})

module.exports = Sale
