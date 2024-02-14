const { Product } = require('../models');

class Controller {

    static async getProduct(req, res, next){
        try {
            let data = await Product.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getProductById(req, res, next){
        try {
            let data = await Product.findByPk(req.params.id)
            if(!data) throw {name: "Data not found"}
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async postProduct(req, res, next){
        try {
            let { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail } = req.body
            let newProduct = await Product.create({
                title, description, price, discountPercentage, rating, stock, brand, category, thumbnail
            })
            res.status(201).json(newProduct)
        } catch (error) {
            next(error)
        }
    }

    static async putProduct(req, res, next){
        try {
            let product = await Product.findByPk(req.params.id)
            if(!product) throw {name : "Data not found"}
            let { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail } = req.body
            let updatedProduct = await product.update({
                title, description, price, discountPercentage, rating, stock, brand, category, thumbnail
            })
            res.status(200).json(updatedProduct)
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next){
        try {
            let product = await Product.findByPk(req.params.id)
            if(!product) throw {name : "Data not found"}
            await product.destroy()
            res.status(200).json({message: `${product.title} is deleted`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller