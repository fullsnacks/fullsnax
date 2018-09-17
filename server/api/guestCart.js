const router = require('express').Router()
const {Order, Sale, Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findOne({
      where: {
        isCart: true,
        sessionId: req.session.id
      },
      include: [
        {
          model: Sale,
          include: [
            {
              model: Product
            }
          ]
        }
      ]
    })
    res.send(orders)
  } catch (err) {
    next(err)
  }
})

module.exports = router
