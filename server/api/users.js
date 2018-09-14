const router = require('express').Router()
const {User, Order, Sale} = require('../db/models')
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
    const singleUser = await User.findAll({
      where: {
        id: userId
      },
      include: [
        {
          model: Order,
            // where: {
            //   isCart: false
            // },
            include: [
              {
                model: Sale
              }
            ]
        }]
    })

    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.destroy({
      where: {id: req.params.id}
    })
    res.json(user)
  } catch (error) {
    console.log(error)
  }
})
