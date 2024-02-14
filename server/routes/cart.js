const express = require('express')
const Controller = require('../controllers/cart')
const authentication = require('../middlewares/authentication')
const router = express.Router()

router.get('/', authentication, Controller.getCart)

router.post('/:productId', authentication, Controller.postCart)

router.patch('/:productId', authentication, Controller.patchCart)

router.delete('/:productId', authentication, Controller.deleteCart)

module.exports = router