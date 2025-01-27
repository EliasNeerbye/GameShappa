const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ message: "Unauthorized cookie!", success: false });
            } else {
                req.user = decoded;
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error!", success: false });
    }
    next();
};

module.exports = verifyToken;
