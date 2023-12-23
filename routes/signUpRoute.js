const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUpController");
const { logger } = require("../middlewares/logger");

// Route pour l'inscription (signUp)
router.post(logger, signUpController);

module.exports = router;
