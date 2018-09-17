const router = require('express').Router()
const {Sale} = require('../db/models/')
const {Product} = require('../db/models')
const {Order} = require('../db/models')
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

// router.get('/:id', async (req, res, next) => {
//   try {
//     const productId = req.params.id
//     const singleProduct = await Product.findById(productId)
//     res.json(singleProduct)
//   } catch (err) {
//     next(err)
//   }
// })

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
            userId: req.user.id
          }
        })
      : await Order.findOrCreate({
          where: {
            isCart: true,
            sessionId: req.session.guestId
          }
        })
    await Sale.create({
      quantity,
      purchasePrice,
      productId,
      orderId: order[0].id
    })
    res.status(201).send()
  } catch (error) {
    next(error)
  }
})
