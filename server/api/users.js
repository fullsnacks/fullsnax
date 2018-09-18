const router = require('express').Router()
const {User, Order, Sale, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      res.send("sorry Corey, you don't have access to this information")
    } else {
      const users = await User.findAll()
      res.json(users)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id/currentOrder', async (req, res, next) => {
  try {
    if (!req.user || Number(req.user.id) !== Number(req.params.id) && req.user.isAdmin) {
      res.send('No, Corey. No.')
    } else {
      const userId = req.params.id
      const singleUser = await User.findAll({
        where: {
          id: userId
        },
        include: [
          {
            model: Order,
            where: {
              isCart: true
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
          }
        ]
      })
      res.json(singleUser[0])
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    console.log('REQ USER', req.user.id, req.params.id)
    if (Number(req.user.id) !== Number(req.params.id) && !req.user.isAdmin) {
      res.send('You no go here')
    } else {
      const userId = req.params.id
      const singleUser = await User.findAll({
        where: {
          id: userId
        },
        include: [
          {
            model: Order, required: false,
              where: {
                isCart: false
              },
              include: [
                {
                  model: Sale,
                  include: [
                    {
                      model: Product,
                    }
                  ]
                }
              ]
          }]
      })
      res.json(singleUser[0])
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      res.send('NO')
    } else {
      const user = await User.destroy({
        where: {id: req.params.id}
      })
      res.json(user)
    }
  } catch (error) {
    console.log(error)
  }
})
