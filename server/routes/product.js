const express = require('express')
const Controller = require('../controllers/product')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const router = express.Router()


router.get('/', authentication, Controller.getProduct)

router.get('/pub', Controller.getProduct)

router.post('/', authentication, Controller.postProduct)

router.get('/:id', authentication, Controller.getProductById)

router.get('/:id/pub', Controller.getProductById)

router.put('/:id', authentication, Controller.putProduct)

router.delete('/:id', authentication, Controller.deleteProduct)

module.exports = router