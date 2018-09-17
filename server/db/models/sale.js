const Sequelize = require('sequelize')
const db = require('../db')

const Sale = db.define('sale', {
  quantity: {
    type: Sequelize.INTEGER
    // add constraints (e.g., required, max/min) - R.K.
  },
  purchasePrice: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
})

module.exports = Sale
