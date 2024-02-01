const express = require("express");
const router = express.Router();
const themeController = require("../controllers/themesController");
const { logger } = require("../middlewares/logger");

router
  .route("/")
  .get(logger, themeController.getAllThemes)
  .post(logger, themeController.createTheme);

router
  .route("/:id")
  .put(logger, themeController.updateTheme)
  .get(logger, themeController.getThemeById)
  .delete(logger, themeController.deleteTheme);

module.exports = router;
