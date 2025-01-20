// Imports
const bcrypt = require("bcrypt");

// Util
const jwtToken = require("../../util/jwt");

//Models
const User = require("../../models/User");

// Constants
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

const register = {
    post: async (req, res) => {
        try {
            const { email, password, confirmPassword } = req.body;
            if (typeof password !== "string") return res.status(400).json({ message: "Password should be string!", success: false });
            if (typeof email !== "string") return res.status(400).json({ message: "Email should be string!", success: false });

            if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
                return res.status(400).json({ message: "Email is not correct!", success: false });

            const alreadyExists = await User.findOne({ email });
            if (alreadyExists) return res.status(400).json({ message: "Email is already in use!", success: false });

            if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match!", success: false });

            const hash = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                email,
                password: hash,
            });

            await newUser.save();

            const newCookie = jwtToken(email);

            res.cookie("jwt", newCookie, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                secure: process.env.ENVIRONMENT === "production",
            });

            res.status(201).json({ message: "User created successfully!", success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error", success: false });
        }
    },
};

module.exports = register;
