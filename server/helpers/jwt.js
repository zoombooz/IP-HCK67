const jwt = require('jsonwebtoken');
const secret = "secretcode"


module.exports = {
    signToken : (payload) => {
        jwt.sign(payload, secret)
    },
    verifyToken : (token) => {
        jwt.verify(token, secret)
    }
}
