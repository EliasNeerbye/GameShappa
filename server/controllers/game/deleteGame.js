// Models
const Game = require("../../models/Game");

const getGames = async (req, res) => {
    try {
        await Game.findByIdAndDelete(req.params.id).then(console.log("Deleted game!"));
        return res.status(200).json({ message: "Game deleted!", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = getGames;
