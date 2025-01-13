const bcrypt = require("bcrypt");

// Models
const User = require("../../models/User");

const login = {
    post: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(email, password);

            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required", success: false });
            }

            if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                return res.status(400).json({ message: "Invalid email format", success: false });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials", success: false });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials", success: false });
            }

            res.status(202).json({
                message: "Login successful",
                success: true,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error", success: false });
        }
    },
};

module.exports = login;
