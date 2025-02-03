const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            // If no token is present, set req.user to null and proceed
            req.user = null;
            return next();
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                // If token is invalid, set req.user to null and proceed
                req.user = null;
                return next();
            } else {
                req.user = decoded;
                return next();
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error!", success: false });
    }
};

module.exports = verifyToken;