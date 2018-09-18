const router = require('express').Router()
const {Sale} = require('../db/models/')
const {Product} = require('../db/models')
const {Order} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const sales = await Sale.findAll({
      include: [
        {
          model: Product
        }
      ]
    })
    res.json({sales})
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {quantity, purchasePrice, productId} = req.body
    if (!req.session.guestId) {
      req.session.guestId = req.sessionID
    }
    const order = req.user
      ? await Order.findOrCreate({
          where: {
            isCart: true,
            userId: req.user.id,
          }
        })
      : await Order.findOrCreate({
          where: {
            isCart: true,
            sessionId: req.session.guestId
          }
        })

    const productDuplicate = await Sale.findOne({
      where: {
        orderId: order[0].id,
        productId: productId
      }
    })
    if (productDuplicate) {
      await Sale.update({
        quantity: Sequelize.literal(`quantity + ${quantity}`)}, {
          where: {
            orderId: order[0].id,
            productId: productId
          }
        })
    } else {
    await Sale.create({
      quantity,
      purchasePrice,
      productId,
      orderId: order[0].id
    })
    }
    res.status(201).send()
  } catch (error) {
    next(error)
  }
})
