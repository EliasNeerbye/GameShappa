const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

//Models
const User = require("../../models/User");

const register = {
    get: (req, res) => {
        res.send("Register");
    },

    post: async (req, res) => {
        console.log("POST");
        try {
            const { email, password, confirmPassword } = req.body;

            if (typeof password !== "string") return res.status(400).send({ message: "Password should be string!", success: false });

            if (typeof email !== "string") return res.status(400).send({ message: "Email should be string!", success: false });

            if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
                return res.status(400).send({ message: "Email is not correct!", success: false });

            if (password !== confirmPassword) return res.status(400).send({ message: "Passwords do not match!", success: false });

            const hash = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                email,
                password: hash,
            });

            await newUser.save();
            console.log(newUser);

            res.status(201).send({ message: "User created successfully!", success: true });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error", success: false });
        }
    },
};

module.exports = register;
