const User = require("../models/User");

const userExists = async (req, res, next) => {
    if (req.user) {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            req.userExists = false;
            req.user.userId = null;
        } else {
            req.userExists = true;
            req.user.userId = user._id;
        }
    } else {
        req.userExists = false;
        req.user = { userId: null }; // Ensure req.user is an object with userId set to null
    }

    next();
};

module.exports = userExists;