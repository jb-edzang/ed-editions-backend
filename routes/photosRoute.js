const express = require("express");
const router = express.Router();
const photosController = require("../controllers/photosController");
const { logger } = require("../middlewares/logger");

router
  .route("/")
  .get(logger, photosController.getAllPhotos)
  .post(logger, photosController.createPhoto);

router
  .route("/:id")
  .get(logger, photosController.getPhotoById)
  .put(logger, photosController.updatePhoto)
  .patch(logger, photosController.updatePhoto)
  .delete(logger, photosController.deletePhoto);

module.exports = router;
