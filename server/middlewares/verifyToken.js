const jwt = require("jsonwebtoken");
const { CustomError } = require("./errors");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; 

        if (!token) {
            throw new CustomError("You are not authenticated", 401);
        }

        const data = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = data._id; 
        console.log("Authenticated user:", req.userId);
        next();
    } catch (err) {
        if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
            next(new CustomError("Token is not valid", 403));
        } else {
            next(err); 
        }
    }
};

module.exports = verifyToken;
