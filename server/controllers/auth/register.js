const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

//Models
const User = require("../../models/User");

const register = {
    post: async (req, res) => {
        try {
            const { email, password, confirmPassword } = req.body;
            console.log(email, password, confirmPassword);

            console.log(typeof password);
            if (typeof password !== "string") return res.status(400).json({ message: "Password should be string!", success: false });

            console.log(typeof email);
            if (typeof email !== "string") return res.status(400).json({ message: "Email should be string!", success: false });

            if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
                return res.status(400).json({ message: "Email is not correct!", success: false });

            if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match!", success: false });

            const hash = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                email,
                password: hash,
            });

            await newUser.save();

            const newCookie = jwt.sign(
                {
                    email,
                },
                process.env.JWT_SECRET
            );

            res.cookie(newCookie, {
                httoOnly: true,
                maxAge: 100000,
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
