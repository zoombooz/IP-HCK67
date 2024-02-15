const express = require('express')
const Controller = require('../controllers/product')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const router = express.Router()
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.get('/', authentication, authorization, Controller.getProduct)

router.post('/', upload.array('imgUrl', 5), authentication, authorization, Controller.postProduct)

router.get('/pub', Controller.getProduct)

router.get('/:id', authentication, authorization, Controller.getProductById)

router.put('/:id', authentication, authorization, Controller.putProduct)

router.delete('/:id', authentication, authorization, Controller.deleteProduct)

router.get('/:id/pub', Controller.getProductById)

module.exports = router