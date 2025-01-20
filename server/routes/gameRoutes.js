const express = require("express");
const router = express.Router();

//Controllers
const gameController = require("../controllers/gameController");

//Middleware
const logger = require("../middleware/logger");

router.get("/", logger, gameController.get.games);
router.get("/:id", logger, gameController.get.game);

router.post("/", logger, gameController.post.game);
router.put("/:id", logger, gameController.put.game);
router.delete("/:id", logger, gameController.delete.game);

module.exports = router;
