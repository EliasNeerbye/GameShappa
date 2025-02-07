const logout = {
    post: async (req, res) => {
        try {
            // Check if the user is authenticated
            if (!req.userExists) {
                return res.status(401).json({ message: "You are not logged in", success: false });
            }

            // Clear the JWT cookie
            res.clearCookie("jwt", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                sameSite: "strict", // Protect against CSRF
            });

            res.status(200).json({
                message: "Logout successful",
                success: true,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error", success: false });
        }
    },
};

module.exports = logout;
