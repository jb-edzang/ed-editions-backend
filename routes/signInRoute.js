const express = require("express");
const router = express.Router();
const signInController = require("../controllers/signInController");
const { logger } = require("../middlewares/logger");

// Route pour l'inscription (signUp)
router.post(logger, signInController);

module.exports = router;
