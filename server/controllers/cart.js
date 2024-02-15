const { Cart, Product } = require('../models');
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
            console.log(data, "<<< DATA");
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

}

module.exports = Controller