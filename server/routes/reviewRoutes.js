const express = require("express");
const router = express.Router();

//Controllers
const reviewController = require("../controllers/reviewController");

//Middleware
const logger = require("../middleware/logger");
const verifyToken = require("../middleware/verifyToken");

router.get("/games/:gameId", logger, reviewController.getGameReviews);
router.get("/user/:userId", logger, reviewController.getUserReviews);
router.get("/:id", logger, reviewController.getReview);

router.post("/:gameId", logger, verifyToken, reviewController.create);
router.delete("/:id", logger, reviewController.delete);

module.exports = router;
