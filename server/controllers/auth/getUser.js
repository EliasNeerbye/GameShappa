const User = require("../../models/User");

const getUser = async (req, res) => {
    try {
        if (req.userExists) {
            try {
                const user = await User.findById(req.user.userId);
                if (user) {
                    return res.status(201).json({ message: "User not found", user: user, success: true });
                } else {
                    return res.status(404).json({ message: "User not found", user: null, success: false });
                }
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal server error!", user: null, success: false });
            }
        } else {
            return res.status(404).json({ message: "User not found", user: null, success: false });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error!", user: null, success: false });
    }
};

module.exports = getUser;
