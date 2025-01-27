const Review = require("../models/Review");
const Game = require("../models/Game");

const reviewController = {
    getGameReviews: async (req, res) => {
        try {
            const result = await Review.find({ game: req.params.gameId });
            console.log(result);
            return res.status(200).json({ message: "Reviews found!", reviews: result, success: true });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error", reviews: null, success: false });
        }
    },
    getUserReviews: async (req, res) => {
        try {
            const result = await Review.find({ game: req.params.userId });
            console.log(result);
            return res.status(200).json({ message: "Reviews found!", reviews: result, success: true });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error", reviews: null, success: false });
        }
    },
    getReview: async (req, res) => {
        try {
            const review = await Review.findById(req.params.id);
            return res.status(200).json({ message: "Review found!", review, success: false });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error", review: null, success: false });
        }
    },
    create: async (req, res) => {
        try {
            const gameId = req.params.gameId;
            const { comment, stars, recommended } = req.body;
            return res.status(201).json({ message: "Review created!", review: null, success: true });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error", success: false });
        }
    },

    delete: async (req, res) => {
        try {
            await Review.findByIdAndDelete(req.params.id);
            return res.status(201).json({ message: "Review deleted!", success: true });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error", success: false });
        }
    },
};

module.exports = reviewController;
