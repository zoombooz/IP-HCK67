const express = require('express')
const Controller = require('../controllers/product')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const router = express.Router()


router.get('/', authentication, Controller.getProduct)

router.post('/', authentication, Controller.postProduct)

router.get('/:id', authentication, Controller.getProductById)

router.put('/:id', (req, res) => {
  res.send('Product update page')
})

router.delete('/:id', (req, res) => {
  res.send('Product delete page')
})

module.exports = router