const express = require('express')
const Controller = require('../controllers/cart')
const authentication = require('../middlewares/authentication')
const router = express.Router()
const midtransClient = require('midtrans-client');

router.get('/', authentication, Controller.getCart)

router.post('/generate-midtrans-token', authentication, Controller.createMidtransToken)

router.get('/:productId', authentication, Controller.getCartById)

router.post('/:productId', authentication, Controller.postCart)

router.patch('/:productId', authentication, Controller.patchCart)

router.delete('/:productId', authentication, Controller.deleteCart)

module.exports = router