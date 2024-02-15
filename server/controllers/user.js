const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { hash, compare } = require('../helpers/bcrypt');

class Controller {
    static async register(req, res, next){
        try {
            let { fullName, email, password, phoneNumber, address } = req.body
            let newUser = await User.create({
                fullName,
                email,
                password : hash(password),
                phoneNumber,
                address
            })
            res.status(201).json(newUser)
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next){
        try {
            if(!req.body.email || !req.body.password){
                throw {name:"Email/password kosong", message:"Email/password is required"}
            }
            let userData = await User.findOne({
                where: {
                    email : req.body.email
                }
            })
            if(!userData || !(compare(req.body.password, userData.password))){
                throw {name:"Invalid Input", message:"Your input is incorrect"}
            }
            const accessToken = jwt.sign({id: userData.id, email: userData.email, role: userData.role}, process.env.ACCESS_TOKEN_SECRET)
            res.status(200).json({accessToken})

        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller