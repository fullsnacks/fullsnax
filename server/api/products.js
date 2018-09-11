const router = require('express').Router()
const {Product} = require('../db/product')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id
    const singleProduct = await Product.findById(productId)
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})
