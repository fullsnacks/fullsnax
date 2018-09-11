const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'http://manrepeller-wpengine.netdna-ssl.com/wp-content/uploads/2017/03/stephenson_manrepeller_snacks_hero.jpg'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.ENUM,
    values: ['candy', 'chips', 'chocolate', 'drinks', 'cookies', 'other']
  }
})

module.exports = Product
