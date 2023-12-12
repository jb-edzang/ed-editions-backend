const express = require("express");
const router = express.Router();
const photosController = require("../../controllers/photosController");
const { logger } = require("../../middlewares/logger");

router
  .route("/")
  .get(logger, photosController.getAllPhotos)
  .post(logger, photosController.createPhoto)
  .put(logger, photosController.updatePhoto)
  .delete(logger, photosController.deletePhoto);

module.exports = router;
