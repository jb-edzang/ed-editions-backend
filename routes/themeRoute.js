const express = require("express");
const router = express.Router();
const themeController = require("../controllers/themesController");
const { logger } = require("../middlewares/logger");

router
  .route("/themes")
  .get((req, res) => {
    themeController.getAllThemes(req, res);
  })
  .post((req, res) => {
    themeController.createTheme(req, res);
  });

router
  .route("/themes/:id")
  .put((req, res) => {
    themeController.updateTheme(req, res);
  })
  .patch((req, res) => {
    themeController.patchTheme(req, res);
  })
  .delete((req, res) => {
    themeController.deleteTheme(req, res);
  });

module.exports = router;
