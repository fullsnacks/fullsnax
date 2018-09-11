const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id
    const singleUser = await User.findById(userId)
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})
