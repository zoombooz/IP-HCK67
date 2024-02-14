const { Cart } = require('../models');

class Controller {

    static async getCart(req, res, next){
        try {
            let { id : userId } = req.user
            let data = await Cart.findAll({
                where : {
                    userId : userId
                }
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
            res.status(201).json(result)
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
            res.status(200).json(result)
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
            res.status(200).json({message: `Product is deleted`})
        } catch (error) {
            next(error)
        }
    }

}

module.exports = Controller