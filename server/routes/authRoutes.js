const express = require("express");
const router = express.Router();

//Controllers
const authController = require("../controllers/authController");

//Middleware
const logger = require("../middleware/logger");
const verifyToken = require("../middleware/verifyToken");
const userExists = require("../middleware/userExists");

router.post("/login", logger, authController.login);
router.post("/register", logger, authController.register);

router.get("/getUser", logger, verifyToken, userExists, authController.getUser);

module.exports = router;
