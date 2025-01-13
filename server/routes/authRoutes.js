const express = require("express");
const router = express.Router();

//Controllers
const authController = require("../controllers/authController");

//Middleware
const logger = require("../middleware/logger");

router.post("/login", logger, authController.login.post);
router.post("/register", logger, authController.register.post);

module.exports = router;
