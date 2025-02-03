const getUser = async (req, res) => {
    try {
        if (req.userExists) {
            return res.status(200).json({ message: "User found!", user: req.user, success: true });
        } else {
            return res.status(404).json({ message: "User not found", user: null, success: false });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error!", user: null, success: false });
    }
};

module.exports = getUser;
