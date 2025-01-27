const express = require("express");
const router = express.Router();

//Controllers
const tagController = require("../controllers/tagController");

//Middleware
const logger = require("../middleware/logger");

router.get("/", logger, tagController.get.all);
router.get("/:id", logger, tagController.get.one);

router.post("/", logger, tagController.create.one);
router.post("/multiple", logger, tagController.create.multiple);
router.delete("/:id", logger, tagController.delete);
router.put("/:id", logger, tagController.edit);

module.exports = router;
