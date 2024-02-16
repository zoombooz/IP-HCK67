const { Cart, Product, User } = require('../models');
const midtransClient = require('midtrans-client');

class Controller {

    static async getCart(req, res, next){
        try {
            let { id : userId } = req.user
            let data = await Cart.findAll({
                where : {
                    userId : userId
                },
                include : Product
            })
            
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getCartById(req, res, next){
        try {
            let { id : userId } = req.user
            let productId = req.params.productId
            let data = await Cart.findOne({
                where : {
                    userId : userId,
                    productId : productId
                },
                include : Product
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async postCart(req, res, next){
        try {
            let { id : userId } = req.user
            let { productId } = req.params
            let { amount } = req.body
            let result = await Cart.create({
                productId, 
                userId,
                amount
            })
            res.status(201).json({message : "Product has been added to cart"})
        } catch (error) {
            next(error)
        }
    }

    static async patchCart(req, res, next){
        try {
            let { id : userId } = req.user
            let { productId } = req.params
            let { amount } = req.body
            let cart = await Cart.findOne({
                where : {
                    userId : userId,
                    productId : productId
                }
            })
            if(!cart) throw {name : "Data not found"}
            let result = await cart.update({
                amount
            })
            res.status(200).json({message : "Product's amount in the cart has been updated"})
        } catch (error) {
            next(error)
        }
    }

    static async deleteCart(req, res, next){
        try {
            let { id : userId } = req.user
            let { productId } = req.params
            let cart = await Cart.findOne({
                where : {
                    userId : userId,
                    productId : productId
                }
            })
            if(!cart) throw {name : "Data not found"}
            await cart.destroy()
            res.status(200).json({message: `Product is deleted from cart`})
        } catch (error) {
            next(error)
        }
    }

    static async createMidtransToken(req, res, next){
        try {

            let user = await User.findByPk(req.user.id)

            let data = await Cart.findAll({
                where : {
                    userId : req.user.id
                },
                include : Product
            })

            let price = 0
            if(data.length > 0) price += 5
            data.forEach(el => {
                price += (el.Product.price * el.amount)
            })

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : process.env.MIDTRANS_SERVER_KEY
            });
    
            let parameter = {
                "transaction_details": {
                    "order_id": `TRANSACTION_${Math.floor(1000000 + Math.random() * 9000000)}`,
                    "gross_amount": price * 15_000
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    // "first_name": "budi",
                    // "last_name": "pratama",
                    "email": user.email,
                    "phone": user.phoneNumber
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            console.log(midtransToken, "<<<<<<<<<<<<<<<<<<<<<<<<");
            
            res.status(201).json(midtransToken)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = Controller