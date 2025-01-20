const jwt = require("jsonwebtoken");
require("dotenv").config();

const signJWT = async (email, role = "guest") => {
    const jwtSecret = process.env.JWT_SECRET;

    const token = jwt.sign(
        {
            email,
            role,
        },
        jwtSecret
    );

    return token;
};

module.exports = signJWT;
