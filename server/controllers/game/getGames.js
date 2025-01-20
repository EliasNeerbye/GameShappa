// Models
const Game = require("../../models/Game");

const getGame = async (req, res) => {
    const games = await Game.find();
    if (!games) {
        res.status(404).json({ message: "No games found", success: false, games: null });
    }

    return res.status(200).json({ message: "Games found!", success: true, games });
};

module.exports = getGame;
