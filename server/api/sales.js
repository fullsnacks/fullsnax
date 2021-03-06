const router = require('express').Router()
const {Sale} = require('../db/models/')
const {Product} = require('../db/models')
const {Order} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      res.status(401).send('ACCESS DENIED')
    } else {
      const sales = await Sale.findAll({
        include: [{model: Product}]
      })
      res.json({sales})
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let {quantity, purchasePrice, productId} = req.body
    if (!req.session.guestId) {
      req.session.guestId = req.sessionID
    }
    const order = req.user
      ? await Order.findOrCreate({
          where: {
            isCart: true,
            userId: req.user.id
          }
        })
      : await Order.findOrCreate({
          where: {
            isCart: true,
            sessionId: req.session.guestId
          }
        })
    if (order[0].promoUsed) {
      purchasePrice = purchasePrice / 2
    }
    const productDuplicate = await Sale.findOne({
      where: {
        orderId: order[0].id,
        productId: productId
      }
    })
    if (productDuplicate) {
      await Sale.update(
        {
          quantity: Sequelize.literal(`quantity + ${quantity}`)
        },
        {
          where: {
            orderId: order[0].id,
            productId: productId
          }
        }
      )
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

router.delete('/:id', async (req, res, next) => {
  try {
    await Sale.destroy({
      where: {id: req.params.id}
    })
    res.send()
  } catch (error) {
    console.log(error)
  }
})
