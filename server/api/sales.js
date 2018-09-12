const router = require('express').Router()
const {Sale} = require('../db/models/')
const {Product} = require('../db/models')
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
    const response = await Sale.create(req.body)
    res.json(response)
  } catch (error) {
    next(error)
  }
})
