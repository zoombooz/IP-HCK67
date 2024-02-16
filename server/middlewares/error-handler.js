module.exports = function errorHandler(err, req, res, next){
    let status = err.status || 500;
    let message = err.message || "Internal server error"

    if(err.message === "Cannot read properties of undefined (reading 'buffer')") err.name = "Invalid Image Input"

    switch(err.name){
        case "Invalid Image Input":
            status = 400;
            message = "Invalid image input"
            break;
        case "Password kosong":
        case "Email/password kosong":
            status = 400;
            message = err.message
            break
        case "SequelizeValidationError":
            status = 400;
            message = err.errors[0].message
            break;
        case "SequelizeUniqueConstraintError":
            status = 400;
            message = "Email has been used";
            break
        case "JSONWebTokenError":
        case "Invalid token":
            status = 401;
            message = "Authentication error";
            break
        case "Invalid Input":
            status = 401
            message = err.message
            break;
        case "Not authorized":
            status = 403;
            message = "You are not authorized"
            break;
        case "Data not found":
            status = 404;
            message = "Data not found"
            break;
        
    }
    console.log(status, message, "<>", err.name, "ERROR HANDLING <><><><><><><><><><>", err);
    res.status(status).json({message})
}