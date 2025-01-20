// Models
const Game = require("../../models/Game");

const postGame = async (req, res) => {
    try {
        const { title, originalPrice, description, shortDescription, publisher, developer, releaseDate, status } = req.body;

        const newGame = new Game({
            title,
            originalPrice,
            description,
            shortDescription,
            publisher,
            developer,
            releaseDate,
            status,
        });

        console.log(newGame);

        await newGame.save();
        res.status(201).json({ message: "Game created successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = postGame;
