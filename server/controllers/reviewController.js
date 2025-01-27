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
            const result = await Review.find({ user: req.params.userId });
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
        if (!req.userExists) return res.status(401).json({ message: "User not found!", review: null, success: false });

        try {
            const userId = req.user.userId;
            const game = await Game.findById(req.params.gameId);

            if (!game) return res.status(404).json({ message: "Game not found!", review: null, success: false });

            const { comment, stars, recommended } = req.body;

            const newReview = new Review({
                user: userId,
                game: game._id,
                comment,
                recommended,
                stars,
            });

            await newReview.save();

            game.reviews.push(newReview._id);
            await game.save();

            return res.status(201).json({ message: "Review created!", review: newReview, success: true });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error", review: null, success: false });
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
