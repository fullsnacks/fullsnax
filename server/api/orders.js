const router = require('express').Router()
const {Sale} = require('../db/models/')
const {Product} = require('../db/models')
const {Order} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        isCart: false
      }
    })
    res.send(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:sessionId', async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId
    const session = await Order.findOne({
      where: {
        sessionId: sessionId
      },
      include: [
        {
          model: Sale
        }
      ]
    })
    res.send(session)
  } catch (error) {
    next(error)
  }
})

// router.get('/:orderId', async (req, res, next) => {
//   try {
//     const orderId = req.params.orderId
//     const order = await Order.findById(orderId)
//     res.send(order)
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
