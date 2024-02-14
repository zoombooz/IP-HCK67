const express = require('express')
const router = express.Router()
const routerUser = require('./user');
const routerProduct = require('./product');
const routerCart = require('./cart');

console.log("MASUK");

router.use('/', routerUser)

router.use('/product', routerProduct)

router.use('/cart', routerCart)

module.exports = router