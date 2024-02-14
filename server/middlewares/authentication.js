const jwt = require('jsonwebtoken');


module.exports = async function authentication(req, res, next){
    try {
        if(!req.headers.authorization){
            throw {name: "Invalid token"}
        }

        let [bearer, token] = req.headers.authorization.split(" ")
        console.log(bearer, token);
        if(!token || bearer !== "Bearer"){
            throw ({name:"Invalid token"})
        }

        let user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(!user){
            throw ({name:"Invalid token"})
        }
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        next()
    } catch (error) {
        if(error.message === "invalid token"){
            error.name = "Invalid token"
        }
        next(error)
    }
}