const express = require("express");
const router = express.Router();
const authUserController = require("../../controllers/authUserController");
const { logger } = require("../../middlewares/logger");

router.route("/").post(logger, authUserController.authUser);

module.exports = router;
