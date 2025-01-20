// Models
const Game = require("../../models/Game");

const getGames = async (req, res) => {
    const game = await Game.findById(req.params.id);

    try {
        if (!game) {
            return res.status(404).json({ message: "Game not found!", success: false, game: null });
        }

        return res.status(200).json({ message: "Game found!", success: true, game });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false, game: null });
    }
};

module.exports = getGames;
