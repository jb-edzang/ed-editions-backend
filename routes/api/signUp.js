const express = require("express");
const router = express.Router();
const signUpController = require("../../controllers/signUpController");
const { logger } = require("../../middlewares/logger");

router.route("/").post(logger, signUpController.signUp);

module.exports = router;
