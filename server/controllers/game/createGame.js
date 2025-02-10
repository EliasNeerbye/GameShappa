const Game = require("../../models/Game");

const postGame = async (req, res) => {
    try {
        const {
            title,
            originalPrice,
            description,
            shortDescription,
            publisher,
            developer,
            releaseDate,
            status,
            tags, // Add tags to destructuring
            discount = 0, // Add discount with default value
        } = req.body;

        const newGame = new Game({
            title,
            originalPrice,
            discount,
            description,
            shortDescription,
            publisher,
            developer,
            releaseDate,
            status,
            tags, // Include tags in the new game object
        });

        await newGame.save();

        // Populate tags before sending response (optional)
        const savedGame = await Game.findById(newGame._id).populate("tags");

        res.status(201).json({
            message: "Game created successfully",
            success: true,
            gameId: savedGame._id,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message, // Include error message in response
        });
    }
};

module.exports = postGame;
