const Game = require("../../models/Game");

const updateGame = async (req, res) => {
    const { id } = req.params;
    const updateContent = req.body;
    try {
        await Game.findByIdAndUpdate(id, updateContent);
        return res.status(202).json({ message: "Game updated successfully!", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error!", success: true });
    }
};

module.exports = updateGame;
