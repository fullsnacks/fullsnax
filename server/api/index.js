const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/sales', require('./sales'))
router.use('/orders', require('./orders'))
router.use('/guestCart', require('./guestCart'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
