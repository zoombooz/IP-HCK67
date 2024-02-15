const { Product, Image } = require('../models');
const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'ddgc3v9ga', 
    api_key: '166443419432395', 
    api_secret: 'RXc3Gz4W-lSEjc1QDqnmCPo0YtA' 
});

class Controller {

    static async getProduct(req, res, next){
        try {
            let data = await Product.findAll({
                include : Image
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getProductById(req, res, next){
        try {
            let data = await Product.findOne({
                where : {
                    id : req.params.id
                },
                include : Image
            })
            if(!data) throw {name: "Data not found"}
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async postProduct(req, res, next){
        try {
            let files = req.files

            let { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail } = req.body
            let newProduct = await Product.create({
                title, description, price, discountPercentage, rating, stock, brand, category, thumbnail
            })

            files.forEach(async el => {
                let b64File = Buffer.from(el.buffer).toString("base64")
                let dataURI = `data:${el.mimetype};base64,${b64File}`

                let result = await cloudinary.uploader.upload(dataURI)
                await Image.create({
                    productId : newProduct.id,
                    imageUrl : result.url
                })
            })

            let product = await Product.findOne({
                where : {
                    id : newProduct.id
                },
                include : Image
            })
            
            res.status(201).json(product)
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