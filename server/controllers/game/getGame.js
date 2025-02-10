const Game = require("../../models/Game");
const Review = require("../../models/Review"); // Assuming the Review model exists
const Tag = require("../../models/Tag"); // Assuming the Tag model exists

const getGames = async (req, res) => {
    try {
        // Use populate to get full Review and Tag data based on ObjectIds
        const game = await Game.findById(req.params.id)
            .populate({
                path: "reviews", // Reference to the Review model
                model: Review, // Specify the model to populate from
                select: "content rating author", // Example of fields to include from the Review model
            })
            .populate({
                path: "tags", // Reference to the Tag model
                model: Tag, // Specify the model to populate from
                select: "name description", // Example of fields to include from the Tag model
            });

        if (!game) {
            return res.status(404).json({ message: "Game not found!", success: false, game: null });
        }

        return res.status(200).json({ message: "Game found!", success: true, game });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false, game: null });
    }
};

module.exports = getGames;
