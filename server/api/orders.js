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
          model: Sale,
          include: [
            {
              model: Product
            }
          ]
        }
      ]
    })
    res.send(session)
  } catch (error) {
    next(error)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId

    await Order.update({isCart: false}, {where: {id: orderId}})

    // const sales = await Sale.findAll({where: {orderId: orderId}})

    // sales.forEach(async sale => {
    //   const product = await Product.findById(sale.productId)
    //   if (product.price !== sale.purchasePrice) {
    //     await Sale.update({purchasePrice: product.price})
    //   }
    // })

    res.status(200).send()
  } catch (error) {
    next(error)
  }
})

module.exports = router
