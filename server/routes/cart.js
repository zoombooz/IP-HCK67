const express = require('express')
const Controller = require('../controllers/cart')
const authentication = require('../middlewares/authentication')
const router = express.Router()
const midtransClient = require('midtrans-client');

router.get('/', authentication, Controller.getCart)

router.post('/generate-midtrans-token', async (req, res, next) => {
    try {

        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction : false,
            serverKey : process.env.MIDTRANS_SERVER_KEY
        });

        let parameter = {
            "transaction_details": {
                "order_id": `TRANSACTION_${Math.floor(1000000 + Math.random() + 9000000)}`,
                "gross_amount": 10000
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "first_name": "budi",
                "last_name": "pratama",
                "email": "budi.pra@example.com",
                "phone": "08111222333"
            }
        };

    } catch (error) {
        next(error)
    }
})

router.get('/:productId', authentication, Controller.getCartById)

router.post('/:productId', authentication, Controller.postCart)

router.patch('/:productId', authentication, Controller.patchCart)

router.delete('/:productId', authentication, Controller.deleteCart)

module.exports = router