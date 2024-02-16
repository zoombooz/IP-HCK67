const {Product} = require('../models');

module.exports = async function authorization(req, res, next){
    try {
        if(req.user.role !== "admin"){
            console.log(req.user.role, "<<<< ROLE");
            throw {name:"Not authorized"}
        }
        next()
    } catch (error) {
        next(error)
    }
}